"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
router.put("/cats/:id", function (req, res) {
    try {
        var id_2 = req.params.id;
        var data_1 = req.body;
        var result_1;
        cats_model_1.Cat.forEach(function (cat) {
            if (cat.id === id_2) {
                cat = data_1;
                result_1 = cat;
            }
        });
        res.send({ success: true, data: { cat: result_1 } });
    }
    catch (error) {
        console.error(error);
        res.status(500).send({ success: false, error: error.message });
    }
});
router.patch("/cats/:id", function (req, res) {
    try {
        var id_3 = req.params.id;
        var data_2 = req.body;
        var result_2;
        cats_model_1.Cat.forEach(function (cat) {
            if (cat.id === id_3) {
                cat = __assign(__assign({}, cat), data_2);
                result_2 = cat;
            }
        });
        res.send({ success: true, data: { cat: result_2 } });
    }
    catch (error) {
        console.error(error);
        res.status(500).send({ success: false, error: error.message });
    }
});
router.delete("/cats/:id", function (req, res) {
    try {
        var id_4 = req.params.id;
        var newCat = cats_model_1.Cat.filter(function (cat) { return cat.id !== id_4; });
        res.send({ success: true, data: { newCat: newCat } });
    }
    catch (error) {
        console.error(error);
        res.status(500).send({ success: false, error: error.message });
    }
});
exports.default = router;
//# sourceMappingURL=cats.route.js.map