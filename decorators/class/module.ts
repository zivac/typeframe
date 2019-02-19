export function Module(elements: {
    controllers: Function[],
    middleware: Function[],
    services: Function[]
}) {
    return function(target: any) {
        Reflect.defineMetadata('moduleElements', elements, target);
    }
}