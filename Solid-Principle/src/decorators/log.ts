export function Log(
  target: any,
  propertyKey: string,
  descriptor: PropertyDescriptor
) {

  const original = descriptor.value;

  descriptor.value = function (...args: any[]) {

    console.log(`📘 Method called: ${propertyKey}`);

    const result = original.apply(this, args);

    return result;
  };

  return descriptor;
}