"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const param_key_1 = require("../../enums/param.key");
function Res() {
    return function (target, propertyKey, index) {
        let routeData = Reflect.getMetadata('paramData', target, propertyKey) || [];
        routeData[index] = {
            key: param_key_1.ParamKey.RES
        };
        Reflect.defineMetadata('paramData', routeData, target, propertyKey);
    };
}
exports.Res = Res;
//# sourceMappingURL=res.js.map