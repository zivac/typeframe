"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const param_key_1 = require("../../enums/param.key");
function Body() {
    return function (target, propertyKey, index) {
        let routeData = Reflect.getMetadata('paramData', target, propertyKey) || [];
        let types = Reflect.getMetadata('design:paramtypes', target, propertyKey);
        routeData[index] = {
            key: param_key_1.ParamKey.BODY,
            type: types[index]
        };
        Reflect.defineMetadata('paramData', routeData, target, propertyKey);
    };
}
exports.Body = Body;
//# sourceMappingURL=body.js.map