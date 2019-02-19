import { Application } from 'express';
import * as bodyParser from "body-parser";
import { ServiceContainer } from './service.container';
import { MiddlewareContainer } from './middleware.container';
import { ControllerContainer } from './controller.container';
import * as express from 'express';

export class ModuleContainer {

    private app: Application
    private jsonParser: any = bodyParser.json()

    private serviceContainer: ServiceContainer
    private middlewareContainer: MiddlewareContainer
    private controllerContainer: ControllerContainer

    constructor(module: Function) {
        let moduleData = Reflect.getMetadata('moduleElements', module);
        if(!moduleData) throw new Error('Missing module data');
        this.serviceContainer = new ServiceContainer(moduleData.services);
        this.middlewareContainer = new MiddlewareContainer(moduleData.middleware, this.serviceContainer);
        this.controllerContainer = new ControllerContainer(moduleData.controllers, this.serviceContainer, this.middlewareContainer)
    }

    load(app?: Application): Application {
        this.app = app || express();
        this.app.use(this.jsonParser);
        this.serviceContainer.loadServices();
        this.middlewareContainer.loadMiddleware();
        this.controllerContainer.loadControllers(this.app);
        return this.app;
    }

}