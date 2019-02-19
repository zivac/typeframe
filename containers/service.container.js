"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ServiceContainer {
    constructor(services) {
        this.services = services;
    }
    loadServices() {
        this.services.forEach(service => this.loadService(service));
    }
    loadService(Service) {
        if (!Service)
            return null;
        let serviceSingleton = this.services.find(item => item instanceof Service);
        if (serviceSingleton)
            return serviceSingleton;
        let dependencies = Reflect.getMetadata('design:paramtypes', Service) || [];
        serviceSingleton = new Service(...dependencies.map(dependency => this.loadService(dependency)));
        this.services.push(serviceSingleton);
        return serviceSingleton;
    }
}
exports.ServiceContainer = ServiceContainer;
//# sourceMappingURL=service.container.js.map