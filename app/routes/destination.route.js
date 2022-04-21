const express = require("express");
const destinations = require("../controllers/destination.controller");
module.exports = function(app){
    const router = express.Router();
    router.post("/", destinations.create);
    router.get("/", destinations.findAll);
    router.get("/trend", destinations.findAllTrend);
    router.get("/:id", destinations.findOne);
    router.put("/:id", destinations.update);
    router.delete("/:id", destinations.delete);
    router.delete("/", destinations.deleteAll);
    app.use("/api/destination", router);
};