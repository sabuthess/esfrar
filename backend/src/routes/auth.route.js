import express from "express";
import passport from "../controllers/auth.controller.js";
import { dotenv_config } from "../config/dotenv.js";

const router = express.Router();

const frontend_url_base = dotenv_config.frontend_url_base;

router.get(
	"/auth/google",
	passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get(
	"/auth/google/callback",
	passport.authenticate("google", {
		failureRedirect: `${frontend_url_base}`,
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
		failureRedirect: `${frontend_url_base}`,
	}),
	(req, res) => {
		res.redirect(`${frontend_url_base}`);
	}
);

router.post("/auth/login", (req, res, next) => {
	passport.authenticate("local", (err, user, info) => {
		if (err) return next(err);
		if (!user) return res.status(400).json({ message: info.message });

		req.login(user, (err) => {
			if (err) return next(err);
			return res.json({ message: "Inicio de sesión exitoso", user });
		});
	})(req, res, next);
});

export default router;
