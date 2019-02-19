"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const http_method_1 = require("../../enums/http.method");
function Put(route, middleware) {
    return function (target, propertyKey, descriptor) {
        let routes = Reflect.getMetadata('routes', target) || [];
        routes.push({
            function: propertyKey,
            url: route,
            type: http_method_1.HttpMethod.PUT,
            middleware: middleware
        });
        Reflect.defineMetadata('routes', routes, target);
    };
}
exports.Put = Put;
//# sourceMappingURL=put.js.map