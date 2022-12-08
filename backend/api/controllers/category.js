const Category = require("../../models/Category");
const { errorHandler } = require("../error/errorHandler");

module.exports = {
    create: async (req, res, next) => {
        const category = new Category(req.body);
        category.save((err, data) => {
            if (err) {
                return res.status(400).json({ err: errorHandler });
            }
            return res.status(200).json({
                success: true,
                data: data,
            });
        });
    },
    getAllCategory: (req, res, next) => {
        Category.find().exec((err, data) => {
            if (err || !data) {
                return res.status(400).json({
                    error: " not found data!",
                });
            }
            return res.status(200).json({
                success: true,
                data: data,
            });
        });
    },
    getCategory: (req, res, next) => {
        const id = req.params.id;
        Category.findById(id).exec((err, category) => {
            if (err || !category) {
                return res.status(400).json({
                    error: "Category not found!",
                });
            }
            return res.status(200).json({
                success: true,
                data: category,
            });
        });
    },
    deleteCategory: (req, res, next) => {
        const id = req.params.id;
        Category.findByIdAndDelete(id, (err, result) => {
            if (err || !result) {
                return res.status(400).json({
                    error: "Category not found!",
                });
            }
            return res.status(200).json({
                success: true,
                message: "Category has been deleted!",
            });
        });
    },
    updateCategory: (req, res, next) => {
        const id = req.params.id;
        const data = req.body;
        Category.findByIdAndUpdate(
            id,
            { $set: data },
            { new: true },
            (err, category) => {
                if (err || !category) {
                    return res.status(400).json({
                        error: "Category not found!",
                    });
                }
                return res.status(200).json({
                    success: true,
                    data: category,
                });
            }
        );
    },
};
