const express = require("express");
const router = express.Router();
const {
    create,
    getCategory,
    getAllCategory,
    updateCategory,
    deleteCategory,
} = require("../api/controllers/category");
const {
    verifyAdmin,
    verifyToken,
} = require("../api/middlewares/verifyPermission");

router.post("/create", verifyAdmin, create);
router.put("/update/:id", verifyAdmin, updateCategory);
router.delete("/delete/:id", verifyAdmin, deleteCategory);
router.get("/:id", verifyToken, getCategory);
router.get("/", verifyToken, getAllCategory);

module.exports = router;
