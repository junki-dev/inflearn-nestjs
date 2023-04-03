"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var app_model_1 = require("./app.model");
var express_1 = __importDefault(require("express"));
var app = express_1.default();
var port = 8000;
var data = [1, 2, 3, 4];
app.use(function (req, res, next) {
    console.log(req.rawHeaders[1]);
    console.log("this is logging middleware");
    next();
});
app.use(express_1.default.json());
app.get("/cats", function (req, res) {
    try {
        var cats = app_model_1.Cat;
        res.send({ sucess: true, data: { cats: cats } });
    }
    catch (error) {
        console.error(error);
        res.status(500).send({ success: false, error: error.message });
    }
});
app.get("/cats/:id", function (req, res) {
    try {
        var id_1 = req.params.id;
        var cats = app_model_1.Cat;
        res.send({ sucess: true, data: { cats: cats.find(function (val) { return val.id === id_1; }) } });
    }
    catch (error) {
        console.error(error);
        res.status(500).send({ success: false, error: error.message });
    }
});
app.post("/cats", function (req, res) {
    try {
        var data_1 = req.body;
        app_model_1.Cat.push(data_1);
        res.status(201).send({ sucess: true, data: { data: data_1 } });
    }
    catch (error) {
        console.error(error);
        res.status(500).send({ success: false, error: error.message });
    }
});
app.use(function (req, res, next) {
    console.log("this is error middleware");
    res.status(404).send({ error: "404 not found error" });
});
app.listen(port, function () {
    console.log("Example app listening on port " + port);
});
//# sourceMappingURL=app.js.map