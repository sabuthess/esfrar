import db from "../config/config.js";

export const User = {
	async create(username, email, password) {
		const q = `
                INSERT INTO user(username, email, )
                VALUES (?, ?, ?)`;

		const [result] = await db.query(q, [username, email, password]);

		return result;
	},

	async findByEmail(email) {
		const q = "SELECT * FROM user WHERE email = ?";
		let [row] = await db.query(q, [email]);

		return row;
	},

	// TODO update data of user profile by example name, picture, etc  

	async update() {},
};

