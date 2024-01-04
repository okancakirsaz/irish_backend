"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DatabaseInit = void 0;
const { Pool } = require('pg');
require('dotenv').config();
class DatabaseInit {
    constructor() {
        this.connectionString = "postgresql://akimelektrikkutahya:5wWJdODn9Yct@ep-shrill-water-49002736-pooler.eu-central-1.aws.neon.tech/irish_coffee_sql?sslmode=require";
        this.pool = new Pool({
            connectionString: this.connectionString,
            ssl: {
                require: true,
            },
        });
    }
}
exports.DatabaseInit = DatabaseInit;
DatabaseInit.instance = new DatabaseInit();
//# sourceMappingURL=database_init.js.map