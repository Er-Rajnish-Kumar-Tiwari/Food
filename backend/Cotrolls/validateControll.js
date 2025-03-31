const crypto=require("crypto");

const validate=async(req,res)=>{
    const {razorpay_payment_id,razorpay_order_id,razorpay_signature}=req.body;

    const sha=crypto.createHmac("sha256",process.env.RAZOR_PASS);

    sha.update(`${razorpay_order_id}|${razorpay_payment_id}`);
    const digest=sha.digest("hex");

    if(digest!==razorpay_signature){
        res.json({
            Status:"404",
            Massage:"Some error",
        });
    }

    res.json({
        Status:"200",
        Massage:"Payment Successfull",
        paymentId:razorpay_payment_id,
        orderId:razorpay_order_id,
    });
};

module.exports=validate;