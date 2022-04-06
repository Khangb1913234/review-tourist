const express = require("express");
const contacts = require("../controllers/review.controller");
module.exports = function(app){
    const router = express.Router();
    router.post("/", contacts.create);
    router.get("/", contacts.findAll);
    router.get("/favorite", contacts.findAllFavorite);
    router.get("/:id", contacts.findOne);
    router.put("/:id", contacts.update);
    router.delete("/:id", contacts.delete);
    router.delete("/", contacts.deleteAll);
    app.use("/api/review", router);
};