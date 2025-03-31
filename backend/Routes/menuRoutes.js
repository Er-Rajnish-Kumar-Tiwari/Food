const express=require("express");
const multer=require("multer");
const {insertMenuItem, displayMenu, deleteMenu} = require("../Cotrolls/menuControll");

const storage=multer.diskStorage({
    destination:"MenuUploads",
    filename: (req, file, cb) => {
        return cb(null, `${Date.now()}-${file.originalname}`);
    }
});

const menuUpload=multer({storage:storage});

const menuRouter=express.Router();

menuRouter.post("/insertMenu",menuUpload.single("menu_image"),insertMenuItem);
menuRouter.get("/displayMenu",displayMenu);
menuRouter.delete("/deleteMenu/:id",deleteMenu);

module.exports=menuRouter;