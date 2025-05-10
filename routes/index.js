import express from "express";

const router = express.Router();

// This is the root route
router.get("/", (req, res) => {
    res.json({
            message: "Welcome to the API"
        }
    )
});


export default router;