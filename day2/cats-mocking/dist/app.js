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
app.get("/cats/som", function (req, res, next) {
    console.log("this is som middleware");
    next();
});
app.get("/", function (req, res) {
    res.send({ cats: app_model_1.Cat });
});
app.get("/cats/blue", function (req, res) {
    res.send({ blue: app_model_1.Cat[0] });
});
app.get("/cats/som", function (req, res) {
    res.send({ som: app_model_1.Cat[1] });
});
app.use(function (req, res, next) {
    console.log("this is error middleware");
    res.status(404).send({ error: "404 not found error" });
});
app.listen(port, function () {
    console.log("Example app listening on port " + port);
});
//# sourceMappingURL=app.js.map