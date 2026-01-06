import db from "../config/config.js";

export const imageModel = {
	create_image: async ({
		user_id,
		title,
		location,
		tags,
		description,
		file_name,
		file_path,
	}) => {
		const sql = `INSERT INTO images (user_id, title, location, tags, description,  file_name, file_path) VALUES(?, ?, ?, ?, ?, ?, ?)`;

		const [result] = await db.query(sql, [
			user_id,
			title,
			location,
			tags,
			description,
			file_name,
			file_path,
			tags,
		]);

		return result;
	},
	delete_image: async ({ user_id, image_id }) => {
		const sql = `DELETE FROM images WHERE user_id=? AND image_id=?`;
		const result = await db.query(sql, [user_id, image_id]);

		return result;
	},
	get_all_images: async () => {
		const sql = `SELECT * FROM images`;
		const result = await db.query(sql);

		return result;
	},
	get_a_single_image: async ({ image_id }) => {
		const sql = `SELECT * FROM images WHERE image_id=?`;
		const [rows] = await db.query(sql, [image_id]);
		return [rows];
	},
	get_images_by_user: async ({ user_id }) => {
		const sql = `SELECT * FROM images WHERE user_id=?`;
		const [rows] = await db.query(sql, [user_id]);

		return [rows];
	},
	get_search_images: async ({ query }) => {
		const sql = `SELECT * FROM images 
                    WHERE LOWER(title) LIKE (?)
                    OR LOWER(location) LIKE (?) 
                    OR LOWER(tags) LIKE (?)`; // agregar paginacion, limites, etc

		const [rows] = await db.query(sql, [
			`%${query}%`,
			`%${query}%`,
			`%${query}%`,
		]);

		return rows;
	},

	// Logic of favorites
	add_to_favorites: async ({ image_id, user_id }) => {
		const sql = `INSERT INTO images_favorites (image_id, user_id) VALUES(?, ?)`;
		const result = await db.query(sql, [image_id, user_id]);

		return result;
	},
	remove_from_favorites: async ({ image_id, user_id }) => {
		const sql = `DELETE FROM images_favorites WHERE image_id=? AND user_id=?  `;
		const result = await db.query(sql, [image_id, user_id]);
		return result;
	},
	get_images_favorites_by_user: async ({ user_id }) => {
		const sql = `SELECT * FROM images_favorites WHERE user_id=?  `;
		const [rows] = await db.query(sql, [user_id]);
		return rows;
	},
	its_on_favorites: async ({ image_id, user_id }) => {
		const sql = `SELECT EXISTS ( SELECT 1 FROM images_favorites WHERE image_id=? AND user_id=?) AS is_favorite  `;

		const [rows] = await db.query(sql, [image_id, user_id]);

		if (rows[0].is_favorite === 1) {
			return "Is favorite";
		} else {
			return "Isn't favorite";
		}
	},

	// Logic of likes

	add_to_likes: async () => {},

	remove_from_likes: async () => {},
	get_images_likes_by_user: async () => {},
	its_in_likes: async () => {},
};
