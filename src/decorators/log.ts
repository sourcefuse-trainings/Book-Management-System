export function Log(
  target: any,
  propertyKey: string,
  descriptor: PropertyDescriptor
) {
  const original = descriptor.value;

  descriptor.value = function (...args: any[]) {
    console.log(`📘 Method: ${propertyKey}`, args);
    return original.apply(this, args);
  };
}