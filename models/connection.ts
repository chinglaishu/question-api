import { Sequelize } from "sequelize";

const config = require("../config/database.ts");
let mode = process.env.APP_ENV;
if (!mode) {mode = "development"; }

const connection = new Sequelize(config[mode] as any);
export default connection;
