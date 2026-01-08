import passport from "passport";
import GoogleStrategy from "passport-google-oidc";
import FacebookStrategy from "passport-facebook";
import dotenv from "dotenv";
import { userModel } from "../models/user.model.js";
import { Strategy as LocalStrategy } from "passport-local";
import bcrypt from "bcrypt";

dotenv.config();

passport.use(
	new LocalStrategy(
		{
			usernameField: "email",
			passwordField: "password",
		},

		async (email, password, done) => {
			try {
				let user = await userModel.find_by_email({ email });
				if (!user) {
					const hashedPassword = await bcrypt.hash(String(password), 12);
					user = await userModel.create_without_provider({
						email,
						password: hashedPassword,
					});
				} else {
					let passwordIsMatch = await bcrypt.compare(
						String(password),
						user.password
					);

					if (!passwordIsMatch) {
						return done(null, false, { message: "Contraseña incorrecta" });
					}
				}

				return done(null, false, { message: "Inicio de sesion exitoso" });
			} catch (error) {
				return done(error);
			}
		}
	)
);

/* ---------------- GOOGLE STRATEGY ---------------- */
passport.use(
	new GoogleStrategy(
		{
			clientID: process.env.GOOGLE_CLIENT_ID,
			clientSecret: process.env.GOOGLE_CLIENT_SECRET,
			callbackURL: "/api/auth/google/callback",
			scope: ["profile", "email"],
		},
		async (accessToken, refreshToken, profile, done) => {
			try {
				const email = profile.emails?.[0]?.value;
				let user = await userModel.find_by_email({ email });

				if (!user) {
					user = await userModel.create_with_provider({
						google_id: profile.id,
						name: profile.displayName,
						email: profile.emails?.[0]?.value,
						avatar: profile.photos?.[0]?.value,
						email_verified: profile.emails?.[0]?.verified,
					});
				}

				return done(null, user);
			} catch (err) {
				return done(err, null);
			}
		}
	)
);
/* ---------------- FACEBOOK STRATEGY ---------------- */
passport.use(
	new FacebookStrategy(
		{
			clientID: process.env["FACEBOOK_CLIENT_ID"],
			clientSecret: process.env["FACEBOOK_CLIENT_SECRET"],
			callbackURL: "/api/auth/facebook/callback",
			state: true,
			profileFields: [
				"id",
				"first_name",
				"last_name",
				"name",
				"picture",
				"emails",
			],
		},
		async (accessToken, refreshToken, profile, cb) => {
			try {
				const email = profile.emails?.[0]?.value;

				const user = await userModel.findByEmail({ email });

				if (!user) {
					user = await userModel.create({
						facebook_id: profile.id,
						name: profile.name,
						email,
						avatar: profile.picture,
						email_verified: profile.emails?.[0]?.verified,
					});
				}
				return done(null, user);
			} catch (err) {
				return done(err, null);
			}
		}
	)
);

/* ---------------- GITHUB STRATEGY ---------------- */
//.......

passport.serializeUser((user, done) => {
	done(null, user.user_id);
});

passport.deserializeUser(async (user_id, done) => {
	try {
		const user = await userModel.find_by_id({ user_id });
		done(null, user);
	} catch (error) {
		done(error);
	}
});

export default passport;
