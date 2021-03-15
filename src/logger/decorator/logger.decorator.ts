import { Logger } from '@nestjs/common';

export const Log = () => {
  return (constructorFunction: new (...args: unknown[]) => unknown) => {
    try {
      const name = constructorFunction.prototype.constructor.name;
      const logger = new Logger(name, true);

      logger.log(`${name} - Logger Init`);
      for (const propertyName in Object.getOwnPropertyDescriptors(
        constructorFunction.prototype,
      )) {
        const descriptor = Object.getOwnPropertyDescriptor(
          constructorFunction.prototype,
          propertyName,
        );
        const isMethod = descriptor.value instanceof Function;
        if (!isMethod) continue;

        const originalMethod = descriptor.value;
        descriptor.value = function (...args: any[]) {
          let startMessage = `The method ${propertyName} starts`;
          if (args) startMessage += `: with args ${JSON.stringify(args)}`;
          logger.log(startMessage);
          try {
            const result = originalMethod.apply(this, args);
            let endMessage = `The method ${propertyName} ends`;
            if (result) endMessage += `: with result ${JSON.stringify(result)}`;
            logger.log(endMessage);
            return result;
          } catch (ex) {
            logger.error('Throw error', ex);
            throw ex;
          }
        };

        Object.defineProperty(
          constructorFunction.prototype,
          propertyName,
          descriptor,
        );
      }
    } catch (error) {
      console.error(error);
    }
  };
};
