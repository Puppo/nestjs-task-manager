export type DbConfig = {
  host: string; // database host
  port: number; // database host
  username: string; // username
  password: string; // user password
  database: string; // name of our database,
};

export const DB_CONFIG: DbConfig = {
  host: process.env.DB_HOST, // database host
  port: parseInt(process.env.DB_PORT, 10), // database host
  username: process.env.DB_USERNAME, // username
  password: process.env.DB_PASSWORD, // user password
  database: process.env.DB_NAME, // name of our database,
};
