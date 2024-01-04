import { response } from "express";

const { Pool } = require('pg');
require('dotenv').config();

export class DatabaseInit{
    static instance:DatabaseInit = new DatabaseInit()
    private readonly connectionString = "postgresql://akimelektrikkutahya:5wWJdODn9Yct@ep-shrill-water-49002736-pooler.eu-central-1.aws.neon.tech/irish_coffee_sql?sslmode=require"
    pool = new Pool({
        connectionString: this.connectionString,
        ssl: {
          require: true,
        },
      });

}