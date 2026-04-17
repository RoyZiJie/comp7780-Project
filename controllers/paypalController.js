const db = require('../config/database');
const paypal = require('@paypal/checkout-server-sdk');

function environment() {
    const clientId = process.env.PAYPAL_CLIENT_ID;
    const clientSecret = process.env.PAYPAL_CLIENT_SECRET;
    
    if (process.env.PAYPAL_MODE === 'live') {
        return new paypal.core.LiveEnvironment(clientId, clientSecret);
    }
    return new paypal.core.SandboxEnvironment(clientId, clientSecret);
}

function client() {
    return new paypal.core.PayPalHttpClient(environment());
}

exports.createOrder = async (req, res) => {
    try {
        const { amount, currency = 'HKD', items, cartData } = req.body;
        
        const request = new paypal.orders.OrdersCreateRequest();
        request.requestBody({
            intent: 'CAPTURE',
            purchase_units: [{
                amount: {
                    currency_code: currency,
                    value: amount.toFixed(2),
                    breakdown: {
                        item_total: {
                            currency_code: currency,
                            value: amount.toFixed(2)
                        }
                    }
                },
                items: items.map(item => ({
                    name: item.name.substring(0, 127),
                    quantity: item.quantity.toString(),
                    unit_amount: {
                        currency_code: currency,
                        value: item.price.toFixed(2)
                    }
                }))
            }],
            application_context: {
                return_url: 'http://localhost:3000/product',
                cancel_url: 'http://localhost:3000/product',
                brand_name: 'Green World',
                shipping_preference: 'NO_SHIPPING',
                user_action: 'PAY_NOW'
            }
        });

        const order = await client().execute(request);
        
        await db.query(
            `INSERT INTO orders (order_id, amount, currency, status, items) 
             VALUES (?, ?, ?, 'pending', ?)`,
            [order.result.id, amount, currency, JSON.stringify(cartData || items)]
        );
        
        res.json({ success: true, orderID: order.result.id });
        
    } catch (error) {
        console.error('Failed to create order:', error);
        res.status(500).json({ success: false, error: error.message });
    }
};

exports.captureOrder = async (req, res) => {
    try {
        const { orderID, payerName, payerEmail } = req.body;
        
        const request = new paypal.orders.OrdersCaptureRequest(orderID);
        request.requestBody({});
        
        const capture = await client().execute(request);
        
        if (capture.result.status === 'COMPLETED') {
            await db.query(
                `UPDATE orders 
                 SET status = 'completed', 
                     payer_id = ?, 
                     payer_name = ?, 
                     payer_email = ? 
                 WHERE order_id = ?`,
                [capture.result.payer.payer_id, payerName || 'Guest', payerEmail || 'No email', orderID]
            );
            
            res.json({ success: true, status: capture.result.status });
        } else {
            throw new Error('Payment not completed');
        }
        
    } catch (error) {
        console.error('Failed to capture payment:', error);
        if (req.body.orderID) {
            await db.query(`UPDATE orders SET status = 'failed' WHERE order_id = ?`, [req.body.orderID]);
        }
        res.status(500).json({ success: false, error: error.message });
    }
};