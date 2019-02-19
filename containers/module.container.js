"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const bodyParser = require("body-parser");
const service_container_1 = require("./service.container");
const middleware_container_1 = require("./middleware.container");
const controller_container_1 = require("./controller.container");
const express = require("express");
class ModuleContainer {
    constructor(module) {
        this.jsonParser = bodyParser.json();
        let moduleData = Reflect.getMetadata('moduleElements', module);
        if (!moduleData)
            throw new Error('Missing module data');
        this.serviceContainer = new service_container_1.ServiceContainer(moduleData.services);
        this.middlewareContainer = new middleware_container_1.MiddlewareContainer(moduleData.middleware, this.serviceContainer);
        this.controllerContainer = new controller_container_1.ControllerContainer(moduleData.controllers, this.serviceContainer, this.middlewareContainer);
    }
    load(app) {
        this.app = app || express();
        this.app.use(this.jsonParser);
        this.serviceContainer.loadServices();
        this.middlewareContainer.loadMiddleware();
        this.controllerContainer.loadControllers(this.app);
        return this.app;
    }
}
exports.ModuleContainer = ModuleContainer;
//# sourceMappingURL=module.container.js.map