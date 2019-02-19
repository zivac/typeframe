"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const action_1 = require("../statics/action");
class ControllerContainer {
    constructor(controllers, serviceContainer, middlewareContainer) {
        this.controllers = controllers;
        this.serviceContainer = serviceContainer;
        this.middlewareContainer = middlewareContainer;
    }
    loadControllers(app) {
        this.app = app;
        this.controllers = this.controllers.map(Controller => {
            let controllerData = Reflect.getMetadata('controllerData', Controller);
            let dependencies = Reflect.getMetadata('design:paramtypes', Controller) || [];
            let controller = new Controller(...dependencies.map(dependency => this.serviceContainer.services.find(service => service instanceof dependency)));
            let controllerRoutes = Reflect.getMetadata('routes', controller) || [];
            controllerRoutes.forEach(route => this.loadRoute(controller, controllerData, route));
            return controller;
        });
    }
    loadRoute(controller, controllerData, routeData) {
        let middleware = routeData.middleware || controllerData.middleware || [];
        let routeMiddleware = middleware.map(middleware => this.middlewareContainer.middleware.find(instance => instance instanceof middleware)).filter(item => item).map(item => item.resolve);
        let routeParams = Reflect.getMetadata('paramData', controller, routeData.function);
        this.app[routeData.type](controllerData.url + routeData.url, routeMiddleware, action_1.Action.createAction(controller, routeData.function, routeParams));
        console.log(routeData.type, controllerData.url + routeData.url, routeData.function);
    }
}
exports.ControllerContainer = ControllerContainer;
//# sourceMappingURL=controller.container.js.map