const fs=require("fs");
const menuModel = require("../Models/menuModel");

const insertMenuItem=async(req,res)=>{

    const {menu_name}=req.body;
    const menu_image=req.file.filename;

    const menuItem=new menuModel({
        menu_name,
        menu_image
    });

    await menuItem.save();

    res.json({
        Status:"200",
        Massage:"Menu Item Iserted",
        menuItem
    });
};

const displayMenu=async(req,res)=>{
    const menuItems=await menuModel.find({});

    res.json({
        Status:"200",
        Massage:"Menu List",
        menuItems
    });
};

const deleteMenu=async(req,res)=>{
    
    const menuId = req.params.id;
    const menuItem = await menuModel.findById(menuId);

    if (menuItem && menuItem.menu_image) {
        fs.unlink(`MenuUploads/${menuItem.menu_image}`, () => {})
    }

    await menuModel.findByIdAndDelete(menuId);

    res.json({
        Status: 200,
        Msg: "Menu-Item deleted successfully!",
    });
}

module.exports={insertMenuItem,displayMenu,deleteMenu};