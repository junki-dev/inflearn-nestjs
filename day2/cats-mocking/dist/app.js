"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var cats_route_1 = __importDefault(require("./cats/cats.route"));
var port = 8000;
var Server = (function () {
    function Server() {
        var app = express_1.default();
        this.app = app;
    }
    Server.prototype.setRoute = function () {
        this.app.use(cats_route_1.default);
    };
    Server.prototype.setMiddleware = function () {
        this.app.use(function (req, res, next) {
            console.log(req.rawHeaders[1]);
            console.log("this is logging middleware");
            next();
        });
        this.app.use(express_1.default.json());
        this.setRoute();
        this.app.use(function (req, res, next) {
            console.log("this is error middleware");
            res.status(404).send({ error: "404 not found error" });
        });
    };
    Server.prototype.listen = function () {
        this.setMiddleware();
        this.app.listen(port, function () {
            console.log("Example app listening on port " + port);
        });
    };
    return Server;
}());
function init() {
    var server = new Server();
    server.listen();
}
init();
//# sourceMappingURL=app.js.map