import passport from "passport";
import GoogleStrategy from "passport-google-oidc";
import FacebookStrategy from "passport-facebook";
import dotenv from "dotenv";
import { User } from "../models/user.model.js"; 

dotenv.config();

/* ---------------- GOOGLE STRATEGY ---------------- */

passport.use(
	new GoogleStrategy(
		{
			clientID: process.env.GOOGLE_CLIENT_ID,
			clientSecret: process.env.GOOGLE_CLIENT_SECRET,
			callbackURL: "/api/google/callback",
			scope: ["profile", "email"],
		},
		async (accessToken, refreshToken, profile, done) => {
			try {
				const data = {
					google_id: profile.id,
					email: profile.emails?.[0]?.value,
					name: profile.displayName,
					avatar: profile.photos?.[0]?.value,
					email_verified: profile.emails?.[0]?.verified,
				};

				let user = await User.findByEmail(data.email);

				if (!user) {
					user = await User.create(data);
				}

				return done(null, user);
			} catch (err) {
				return done(err, null);
			}
		}
	)
);

passport.use(
	new FacebookStrategy(
		{
			clientID: process.env["FACEBOOK_CLIENT_ID"],
			clientSecret: process.env["FACEBOOK_CLIENT_SECRET"],
			callbackURL: "/api/facebook/callback",
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
				const data = {
					facebook_id: profile.id,
					email: profile.emails?.[0]?.value,
					name: profile.name,
					avatar: profile.picture,
					email_verified: profile.emails?.[0]?.verified,
				};

				let user = await User.findByEmail(data.email);

				if (!user) {
					user = await User.create(data);
				}
				return done(null, user);
			} catch (err) {
				return done(err, null);
			}
		}
	)
);

passport.serializeUser((user, done) => {
	done(null, user.id);
});

passport.deserializeUser((id, done) => {
	db.get(`SELECT * FROM users WHERE id = ?`, [id], (err, row) => {
		if (err) return done(err);
		done(null, row);
	});
});

export default passport;
