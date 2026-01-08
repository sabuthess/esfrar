import dotenv from "dotenv";

dotenv.config();

export const dotenv_config = {
	port: process.env.PORT || 8000,
	db: {
		host: process.env.DB_HOST,
		user: process.env.DB_USER,
		password: process.env.DB_PASSWORD,
		name: process.env.DB_NAME,
	},
	frontend_url_base: process.env.FRONTEND_URL_BASE,
	session_secret : process.env.SESSION_SECRET
};


