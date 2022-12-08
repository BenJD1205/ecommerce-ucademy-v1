const Product = require("../../models/Product");
const { errorHandler } = require("../error/errorHandler");
const _ = require("lodash");
const fs = require("fs");
const formidable = require("formidable");

const create = async (req, res, next) => {
    let form = new formidable.IncomingForm();
    form.keepExtensions = true;
    form.parse(req, (err, fields, files) => {
        if (err) {
            return res.status(400).json({
                error: "Image could not be uploaded",
            });
        }
        // check for all fields
        const { name, description, price, category, quantity, shipping } =
            fields;

        if (
            !name ||
            !description ||
            !price ||
            !category ||
            !quantity ||
            !shipping
        ) {
            return res.status(400).json({
                error: "All fields are required",
            });
        }
        let product = new Product(fields);
        if (files.photo) {
            // console.log("FILES PHOTO: ", files.photo);
            if (files.photo.size > 1000000) {
                return res.status(400).json({
                    error: "Image should be less than 1mb in size",
                });
            }
            product.photo.data = fs.readFileSync(files.photo.filepath);
            product.photo.contentType = files.photo.mimetype;
        }
        product.save((err, result) => {
            if (err) {
                return res.status(400).json({
                    error: errorHandler(err),
                });
            }
            return res.status(200).json({
                success: true,
                data: result,
            });
        });
    });
};

const updateProduct = (req, res, next) => {
    const id = req.params.id;
    let data = [];
    let form = new formidable.IncomingForm();
    form.keepExtensions = true;
    form.parse(req, async (err, fields, files) => {
        if (err) {
            return res.status(400).json({
                error: "Image could not be uploaded",
            });
        }
        // 1kb = 1000
        // 1mb = 1000000
        if (files.photo) {
            // console.log("FILES PHOTO: ", files.photo);
            if (files.photo.size > 1000000) {
                return res.status(400).json({
                    error: "Image should be less than 1mb in size",
                });
            }
            data = {
                ...fields,
                photo: {
                    data: fs.readFileSync(files.photo.filepath),
                    contentType: files.photo.mimetype,
                },
            };
        }

        const updated = await Product.findByIdAndUpdate(
            id,
            { $set: data },
            { new: true }
        );
        return res.status(200).json({
            success: true,
            data: updated,
        });
    });
};

const deleteProduct = (req, res, next) => {
    const id = req.params.id;
    Product.findByIdAndDelete(id, (err, result) => {
        if (err || !result) {
            return res.status(400).json({
                error: "Product not found!",
            });
        }
        return res.status(200).json({
            success: true,
            message: "Product has been deleted!",
        });
    });
};

const getProduct = (req, res, next) => (idx) => {
    const id = req.params.productId || idx;
    Product.findById(id).exec((err, product) => {
        if (err || !product) {
            return res.status(400).json({
                error: "Product not found!",
            });
        }
        return res.status(200).json({
            success: true,
            data: product,
        });
    });
};

const getProducts = (req, res, next) => {
    let order = req.query.order ? req.query.order : "asc";
    let sortBy = req.query.sortBy ? req.query.sortBy : "_id";
    let limit = req.query.limit ? parseInt(req.query.limit) : 6;

    Product.find()
        .select("-photo")
        .populate("category")
        .sort([[sortBy, order]])
        .limit(limit)
        .exec((err, data) => {
            if (err) {
                return res.status(400).json({ error: "Products not found" });
            }
            return res.status(200).json({
                success: true,
                data: data,
            });
        });
};

const getProductsRelated = async (req, res, next) => {
    const id = req.params.id;
    let limit = req.query.limit ? parseInt(req.query.limit) : 6;
    const product = await Product.findById(id);
    if (!product) return res.status(404).json({ error: "Product not found" });
    Product.find({ _id: { $ne: product }, category: product.category })
        .limit(limit)
        .populate("category", "_id name")
        .exec((err, products) => {
            if (err) {
                return res.status(400).json({ error: "Products not found" });
            }
            return res.status(200).json({
                success: true,
                data: products,
            });
        });
};

module.exports = {
    getProduct,
    create,
    updateProduct,
    deleteProduct,
    getProducts,
    getProductsRelated,
};
