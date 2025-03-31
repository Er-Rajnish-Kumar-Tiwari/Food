const userModel = require("../Models/userModel.js");

const addToCart=async(req,res)=>{
    try {
        const userData=await  userModel.findById(req.body.userId);
        const cartData= await userData.cartData;

        if(!cartData[req.body.iteamId]){
            cartData[req.body.iteamId]=1;
        }
        else{
            cartData[req.body.iteamId]+=1;
        }

        await userModel.findByIdAndUpdate(req.body.userId,{cartData});
        res.json({
            Status:"200",
            Massage:"Added to Cart"
        });

    } catch{
        return res.json({
            Status:"400",
            Massage:"Some error"
        });
    };
};

const removeFromCart=async(req,res)=>{
    try {
        const userData=await  userModel.findById(req.body.userId);
        const cartData= await userData.cartData;

        if(cartData[req.body.iteamId]>0){
            cartData[req.body.iteamId]-=1;
        }

        await userModel.findByIdAndUpdate(req.body.userId,{cartData});
        res.json({
            Status:"200",
            Massage:"Remove from Cart"
        });
        
    } catch{
        return res.json({
            Status:"200",
            Massage:"Some error"
        });
    };
};

const fetchCart=async(req,res)=>{
    try {
        const userData=await  userModel.findById(req.body.userId);
        const cartData= await userData.cartData;
        
        res.json({
            Status:"200",
            cartData
        });

    } catch {
        return res.json({
            Status:"200",
            Massage:"Some error"
        });
    }
};

module.exports={addToCart,removeFromCart,fetchCart};