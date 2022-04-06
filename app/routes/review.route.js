const express = require("express");
const reviews = require("../controllers/review.controller");
module.exports = function(app){
    const router = express.Router();
    router.post("/", reviews.create);
    router.get("/", reviews.findAll);
    router.get("/favorite", reviews.findAllFavorite);
    router.get("/:id", reviews.findOne);
    router.put("/:id", reviews.update);
    router.delete("/:id", reviews.delete);
    router.delete("/", reviews.deleteAll);
    app.use("/api/review", router);
};