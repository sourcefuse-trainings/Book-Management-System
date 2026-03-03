export function Log(target, propertyKey, descriptor) {
    const original = descriptor.value;
    descriptor.value = function (...args) {
        console.log(`📘 Method: ${propertyKey}`, args);
        return original.apply(this, args);
    };
}
