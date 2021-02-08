const postgresPass = process.env.PSQL_PASS || "";

const databaseConfig = {
  production: {
    database: "symbior_beta_user",
    dialect: "postgres",
    host: "symbior-beta.ceasmppocqku.ap-southeast-1.rds.amazonaws.com",
    password: postgresPass,
    username: "postgres",
  },
  development: {
    database: "bearhand",
    dialect: "postgres",
    host: "localhost",
    port: 5432,
    password: "a2056123",
    username: "postgres",
  },
  test: {
    database: "user",
    dialect: "postgres",
    host: "localhost",
    logging: false,
    password: "postgres",
    username: "postgres",
  },
};

module.exports = databaseConfig;
