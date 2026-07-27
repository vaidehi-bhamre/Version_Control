"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const httpCode_1 = require("./constants/httpCode");
const httpErrorMessage_1 = require("./constants/httpErrorMessage");
const httpSuccessMessage_1 = require("./constants/httpSuccessMessage");
const routes_1 = __importDefault(require("./routes"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.get("/health", (_req, res) => {
    return res.status(httpCode_1.HTTP_CODE.OK).json({
        message: httpSuccessMessage_1.HTTP_SUCCESS_MESSAGE.HEALTH_CHECK,
    });
});
app.use("/api", routes_1.default);
app.use((_req, res) => {
    return res.status(httpCode_1.HTTP_CODE.NOT_FOUND).json({
        message: httpErrorMessage_1.HTTP_ERROR_MESSAGE.ROUTE_NOT_FOUND,
    });
});
app.use((error, _req, res, _next) => {
    console.error("Unhandled error:", error);
    return res.status(httpCode_1.HTTP_CODE.INTERNAL_SERVER_ERROR).json({
        message: httpErrorMessage_1.HTTP_ERROR_MESSAGE.INTERNAL_SERVER_ERROR,
    });
});
exports.default = app;
//# sourceMappingURL=app.js.map