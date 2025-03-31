const orderModel = require("../Models/orderModel");

const placeOrder=async(req,res)=>{

    const newOrder=new  orderModel ({
        userId:req.body.userId,
        items:req.body.items,
        amount:req.body.amount,
        address:req.body.address
    });
    await newOrder.save();

    res.json({
        Status:"200",
        Massage:"Address saved",
        newOrder
    });
};

const userOrders=async(req,res)=>{
    const orders=await orderModel.find({userId:req.body.userId});
    
    res.json({
        Status:"200",
        Massage:"User Orders",
        data:orders
    });
};

const adminOrders=async(req,res)=>{
    const orders=await orderModel.find({});
    
    res.json({
        Status:"200",
        Massage:"User Orders",
        data:orders
    });
};

const updateStatus=async(req,res)=>{
    await orderModel.findByIdAndUpdate(req.body.orderId,{status:req.body.status});
    res.json({
        Status:"200",
        Massage:"Status Updated"
    });
};

module.exports={placeOrder,userOrders,adminOrders,updateStatus};