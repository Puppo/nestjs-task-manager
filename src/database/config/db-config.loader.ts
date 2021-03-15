import { registerAs } from '@nestjs/config';
import * as Joi from 'joi';

const dbConfigValidation = Joi.object({
  host: Joi.string().required(),
  port: Joi.number().required(), // database host
  username: Joi.string().required(),
  password: Joi.string().required(),
  database: Joi.string().required(),
});

export default registerAs('dbConfig', () => {
  const config = Object.freeze({
    host: process.env.DB_HOST, // database host
    port: parseInt(process.env.DB_PORT, 10), // database host
    username: process.env.DB_USERNAME, // username
    password: process.env.DB_PASSWORD, // user password
    database: process.env.DB_NAME, // name of our database,
  });

  const validation = dbConfigValidation.validate(config);
  if (validation.error)
    throw new Error(`Db Config is not valid: ${validation.error.message}`);

  return config;
});
