import mysql from "mysql2/promise.js";
import {dotenv_config} from "./dotenv.js";


	const pool = mysql.createPool({
		host: dotenv_config.db.host,
		user: dotenv_config.db.user,
		password: dotenv_config.db.password,
		database: dotenv_config.db.name,
		waitForConnections: true,
		connectionLimit: 10,
		connectTimeout: 10000,
	});

	try {
		const connection = await pool.getConnection();
		console.log("Connecting to  MySQL whit pool");
		connection.release();
	} catch (err) {
		console.error("Error to the connecting MySQL:", err);
	}



export default pool;