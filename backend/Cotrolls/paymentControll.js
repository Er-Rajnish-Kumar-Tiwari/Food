const Razorpay = require("razorpay");

const payment = async (req, res) => {
    try {

        const razorpay = new Razorpay({
            key_id: process.env.RAZOR_ID,
            key_secret: process.env.RAZOR_PASS,
        });

        const options = req.body;

        const order = await razorpay.orders.create(options);

        if (!order) {
            return res.status(400).json({
                Status: "error",
                Message: "Failed to create order"
            });
        }

        return res.status(200).json(order);

    } catch (error) {
        console.error(error);

        return res.status(500).json({
            Status: "error",
            Message: "Some internal server error occurred",
            error: error.message || error
        });
    }
};

module.exports = payment;
