"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const http_error_1 = require("../classes/http.error");
const param_key_1 = require("../enums/param.key");
class Parameter {
    static resolve(req, res, param) {
        if (!param)
            return null;
        switch (param.key) {
            case param_key_1.ParamKey.REQ:
                return req;
            case param_key_1.ParamKey.RES:
                return res;
            case param_key_1.ParamKey.PARAM:
                let paramValue = req.params[param.name] || req.query[param.name] || (req.body ? req.body[param.name] : undefined);
                if (param.required && (paramValue === undefined || paramValue === null))
                    throw new http_error_1.HttpError(400, `${param.name} is required`);
                if (param.type) {
                    if (param.type == String && paramValue)
                        paramValue = paramValue.toString();
                    else if (param.type == Number)
                        paramValue = Number.parseFloat(paramValue);
                    else if (param.type != Object && param.type != Array)
                        paramValue = new param.type(paramValue);
                }
                return paramValue;
            case param_key_1.ParamKey.BODY:
                if (param.type)
                    return new param.type(req.body);
                else
                    return req.body;
            case param_key_1.ParamKey.QUERY:
                if (param.type)
                    return new param.type(req.query);
                else
                    return req.query;
            default:
                return null;
        }
    }
}
exports.Parameter = Parameter;
//# sourceMappingURL=parameter.js.map