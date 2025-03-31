const foodModel = require("../Models/foodModel.js");
const fs = require("fs");

const insertFoodItem = async (req, res) => {
    try {
        const { name, price, description, category } = req.body;
        const image = req.file.filename;

        const foodItem = new foodModel({
            name,
            price,
            description,
            category,
            image,
        });

        await foodItem.save();

        res.json({
            Status: 201,
            Msg: "Food item inserted successfully",
            foodItem,
        });
    }
     catch (error) {
        res.json({ Status: 500, Msg: "Server Error", error: error.message });
    }
};

const displayFoodItem = async (req, res) => {
    try {
        const foodItems = await foodModel.find({});
        res.json({
            Status: 200,
            Msg: "Food items list",
            foodItems,
        });
    }
     catch (err) {
        res.json({
            Status: 500,
            Msg: "Some error occurred on the server",
            error: err.message,
        });
    }
};

const updateFoodItem = async (req, res) => {
    try {
        const eid = req.params.id;
        const { name, price, description, category } = req.body;

        let updateItem = {
            name,
            price,
            description,
            category,
        };

        if (req.file) {
            const foodItem = await foodModel.findById(eid);

            if (foodItem && foodItem.image) {
                fs.unlink(`Uploads/${foodItem.image}`, () => {})
            }
            updateItem.image = req.file.filename;
        }

        const foodItem = await foodModel.updateOne({ _id: eid }, updateItem);

        res.json({
            Status: 200,
            Msg: "Food-Item updated successfully!",
            foodItem,
        });
    }
     catch (err) {
        res.json({
            Status: 500,
            Msg: "Some error in updating the food-item",
            error: err.message,
        });
    }
};

const deleteFoodItem = async (req, res) => {
    try {
        const foodId = req.params.id;
        const foodItem = await foodModel.findById(foodId);

        if (foodItem && foodItem.image) {
            fs.unlink(`Uploads/${foodItem.image}`, () => {})
        }

        await foodModel.findByIdAndDelete(foodId);

        res.json({
            Status: 200,
            Msg: "Food-Item deleted successfully!",
        });
    } 
    catch (err) {
        res.json({
            Status: 500,
            Msg: "Some error occurred!",
            error: err.message,
        });
    }
};

module.exports = {
    insertFoodItem,
    displayFoodItem,
    updateFoodItem,
    deleteFoodItem,
};
