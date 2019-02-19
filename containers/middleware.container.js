"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class MiddlewareContainer {
    constructor(middleware, serviceContainer) {
        this.middleware = middleware;
        this.serviceContainer = serviceContainer;
    }
    loadMiddleware() {
        this.middleware = this.middleware.map(Middleware => {
            let dependencies = Reflect.getMetadata('design:paramtypes', Middleware) || [];
            return new Middleware(...dependencies.map(dependency => this.serviceContainer.services.find(service => service instanceof dependency)));
        });
    }
}
exports.MiddlewareContainer = MiddlewareContainer;
//# sourceMappingURL=middleware.container.js.map