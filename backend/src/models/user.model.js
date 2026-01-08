import db from "../config/config.js";

export const userModel = {
	create_with_provider: async ({
		provider_id,
		username,
		email,
		profile_picture,
		email_verified,
	}) => {
		const sql = `
		INSERT INTO users (provider_id, username, email, profile_picture, email_verified)
		VALUES (?, ?, ?, ?, ?)
	`;
		const [result] = await db.query(sql, [
			provider_id,
			username,
			email,
			profile_picture,
			email_verified ?? false,
		]);
		return {
			user_id: result.insertId,
			provider_id,
			username,
			email,
			profile_picture,
			email_verified: email_verified ?? false,
		};
	},

	create_without_provider: async ({ email, password }) => {
		const sql = `
		INSERT INTO users ( email, password)
		VALUES (?, ?)
	`;
		const [result] = await db.query(sql, [email, password]);
		return { user_id: result.insertId, email };
	},

	find_by_email: async ({ email }) => {
		const sql = `SELECT * FROM users WHERE email =?`;
		const [rows] = await db.query(sql, [email]);

		return rows[0] || null;
	},

	find_by_id: async ({ user_id }) => {
		const sql = `SELECT * FROM users WHERE user_id =?`;
		const [rows] = await db.query(sql, [user_id]);

		return rows[0] || null;
	},
};
