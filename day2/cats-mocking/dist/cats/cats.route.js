"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var cats_model_1 = require("./cats.model");
var router = express_1.Router();
router.get("/cats", function (req, res) {
    try {
        var cats = cats_model_1.Cat;
        res.send({ sucess: true, data: { cats: cats } });
    }
    catch (error) {
        console.error(error);
        res.status(500).send({ success: false, error: error.message });
    }
});
router.get("/cats/:id", function (req, res) {
    try {
        var id_1 = req.params.id;
        var cats = cats_model_1.Cat;
        res.send({ sucess: true, data: { cats: cats.find(function (val) { return val.id === id_1; }) } });
    }
    catch (error) {
        console.error(error);
        res.status(500).send({ success: false, error: error.message });
    }
});
router.post("/cats", function (req, res) {
    try {
        var data = req.body;
        cats_model_1.Cat.push(data);
        res.status(201).send({ sucess: true, data: { data: data } });
    }
    catch (error) {
        console.error(error);
        res.status(500).send({ success: false, error: error.message });
    }
});
exports.default = router;
//# sourceMappingURL=cats.route.js.map