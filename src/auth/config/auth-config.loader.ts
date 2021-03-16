import { ConfigType, registerAs } from '@nestjs/config';
import * as Joi from 'joi';

const authConfigValidation = Joi.object({
  jwtSecret: Joi.string().required(),
  jwtExpiresIn: Joi.number().required(),
});

const loadAuthConfig = () => {
  const config = Object.freeze({
    jwtSecret: process.env.JWT_SECRET,
    jwtExpiresIn:
      parseInt(process.env.JWT_EXPIRES_IN, 10) || process.env.JWT_EXPIRES_IN,
  });

  const validation = authConfigValidation.validate(config);
  if (validation.error)
    throw new Error(`Auth Config is not valid: ${validation.error.message}`);

  return config;
};

export const authConfigLoader = registerAs('authConfig', loadAuthConfig);

export type AuthConfig = ConfigType<typeof authConfigLoader>;
export const AUTH_CONFIG_KEY = authConfigLoader.KEY;
