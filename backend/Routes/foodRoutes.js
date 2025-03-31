const express = require("express");
const multer = require("multer");
const { insertFoodItem, displayFoodItem, updateFoodItem, deleteFoodItem } = require("../Cotrolls/foodControll.js");

const foodRouter = express.Router();

const storage = multer.diskStorage({
    destination: "Uploads",
    filename: (req, file, cb) => {
        return cb(null, `${Date.now()}-${file.originalname}`);
    }
});

const upload = multer({ storage: storage });

foodRouter.post("/insert", upload.single("image"), insertFoodItem);
foodRouter.get("/display", displayFoodItem);
foodRouter.put("/update/:id", upload.single("image"), updateFoodItem);
foodRouter.delete("/delete/:id", deleteFoodItem);

module.exports = foodRouter;
