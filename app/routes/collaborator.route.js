const express = require("express");
const collaborators = require("../controllers/collaborator.controller");
module.exports = function(app){
    const router = express.Router();
    router.post("/", collaborators.create);
    router.get("/", collaborators.findAll);
    router.get("/:id", collaborators.findOne);
    router.put("/:id", collaborators.update);
    router.delete("/:id", collaborators.delete);
    router.delete("/", collaborators.deleteAll);
    app.use("/api/collaborator", router);
};