import pg from "pg"
import {db} from "./config.js"

const {Pool} = pg

const pool = new Pool({
    user: db.user,
    password: db.password,
    host: db.host,
    port: db.port,
    database: db.database
})

export {pool}