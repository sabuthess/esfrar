import express from "express";
import cors from "cors";
import { dotenv_config } from "./config/dotenv.js";
import authRoutes from "./routes/auth.route.js";
import  session  from "express-session";
import passport from "passport";

const app = express();

const PORT = dotenv_config.port;
const SESSION_SECRET = dotenv_config.session_secret

app.use(cors());
app.use(express.json());

app.use(
	session({
		secret: SESSION_SECRET, 
		resave: false,
		saveUninitialized: false,
	})
);

app.use(passport.initialize());
app.use(passport.session());

app.use("/api", authRoutes);

app.get("/", (req, res) => {
	res.send("Hello world!");
});

app.listen(PORT, () => {
	console.log(
		`----------------------- server runing on the port: ${PORT} -----------------------`
	);
});