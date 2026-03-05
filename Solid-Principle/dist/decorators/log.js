export function Log(target, propertyKey, descriptor) {
    const original = descriptor.value;
    descriptor.value = function (...args) {
        console.log(`📘 Method called: ${propertyKey}`);
        const result = original.apply(this, args);
        return result;
    };
    return descriptor;
}
