import express from "express";
import passport from "../controllers/auth.controller.js";
import { dotenv_config } from "../config/dotenv.js";
const router = express.Router();

const frontend_url_base = dotenv_config.frontend_url_base;

router.get(
	"/google",
	passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get(
	"/google/callback",
	passport.authenticate("google", {
		failureRedirect: `${frontend_url_base}/hello`,
	}),
	(req, res) => {
		// Si llega aquí, la autenticación fue exitosa
		res.redirect(`${frontend_url_base}`);
	}
);

router.get(
	"/facebook",
	passport.authenticate("facebook", { scope: ["email"] })
);

router.get(
	"/facebook/callback",
	passport.authenticate("facebook", {
		failureRedirect:`${frontend_url_base}`,
	}),
	(req, res) => {
		res.redirect(`${frontend_url_base}`);
	}
);

export default router;
