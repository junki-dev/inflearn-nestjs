"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var cats_route_1 = __importDefault(require("./cats/cats.route"));
var app = express_1.default();
var port = 8000;
app.use(function (req, res, next) {
    console.log(req.rawHeaders[1]);
    console.log("this is logging middleware");
    next();
});
app.use(express_1.default.json());
app.use("/", cats_route_1.default);
app.use(function (req, res, next) {
    console.log("this is error middleware");
    res.status(404).send({ error: "404 not found error" });
});
app.listen(port, function () {
    console.log("Example app listening on port " + port);
});
//# sourceMappingURL=app.js.map