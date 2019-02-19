"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const http_method_1 = require("../../enums/http.method");
function Delete(route, middleware) {
    return function (target, propertyKey, descriptor) {
        let routes = Reflect.getMetadata('routes', target) || [];
        routes.push({
            function: propertyKey,
            url: route,
            type: http_method_1.HttpMethod.DELETE,
            middleware: middleware
        });
        Reflect.defineMetadata('routes', routes, target);
    };
}
exports.Delete = Delete;
//# sourceMappingURL=delete.js.map