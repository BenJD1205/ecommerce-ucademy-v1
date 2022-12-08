const express = require("express");
const router = express.Router();
const {
    create,
    getProduct,
    deleteProduct,
    updateProduct,
    getProducts,
    getProductsRelated,
} = require("../api/controllers/product");
const {
    verifyAdmin,
    verifyToken,
} = require("../api/middlewares/verifyPermission");

router.post("/create", verifyAdmin, create);
router.put("/update/:id", verifyAdmin, updateProduct);
router.delete("/delete/:id", verifyAdmin, deleteProduct);
router.get("/:productId", verifyToken, getProduct);
router.get("/", verifyToken, getProducts);
router.get("/related/:id", verifyToken, getProductsRelated);

module.exports = router;
