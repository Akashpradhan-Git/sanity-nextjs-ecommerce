import Razorpay from 'razorpay'

export default async function handler(req, res) {
    const data = req.body
    const { amount, currency, receipt } = JSON.parse(data)

    try {
        const instance = new Razorpay({
            key_id: process.env.RAZORPAY_KEY_ID,
            key_secret: process.env.RAZORPAY_SECRET,
        });
        const options = {
            amount: amount * 100, // amount in smallest currency unit
            currency: currency,
            receipt: receipt,
        };
        const order = await instance.orders.create(options);
        if (!order) return res.status(500).send("Some error occured");
        return res.json(order);
    } catch (error) {
        console.log(error);
    }
}


