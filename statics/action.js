"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_error_1 = require("../classes/http.error");
const parameter_1 = require("./parameter");
class Action {
    static createAction(controller, route, routeParams = []) {
        return (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                let response = yield controller[route](...routeParams.map(param => parameter_1.Parameter.resolve(req, res, param)));
                if (!res.headersSent)
                    res.send(response);
            }
            catch (err) {
                if (err instanceof http_error_1.HttpError) {
                    res.status(err.status);
                    res.send({
                        error: err.message
                    });
                }
                else {
                    console.error(err);
                    res.status(500);
                    res.send({
                        error: "Internal server error"
                    });
                }
            }
        });
    }
}
exports.Action = Action;
//# sourceMappingURL=action.js.map