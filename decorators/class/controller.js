"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function Controller(prefix, middleware) {
    return function (target) {
        Reflect.defineMetadata('controllerData', {
            url: prefix,
            middleware: middleware
        }, target);
    };
}
exports.Controller = Controller;
//# sourceMappingURL=controller.js.map