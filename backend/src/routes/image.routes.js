import express from "express";
import {
	addImageToFavorites,
	deleteImage,
	getAllImages,
	getASingleImage,
	getImagesByUser,
	getImagesFavoritesByUser,
	getIsFavorite,
	getSearchImages,
	removeImageFromFavorites,
	uploadImage,
} from "../controllers/image.controller.js";

const router = express.Router();

router.get("/", getAllImages);
router.get("/images", getSearchImages);
router.get("/images/:image_id", getASingleImage);
router.get("/images/user/:user_id", getImagesByUser);
router.post("/image/create", uploadImage);
router.delete("/image/:image_id", deleteImage);

// Logic of favorites
router.post("/image/favorite/:image_id", addImageToFavorites);
router.delete("/image/favorite/:image_id", removeImageFromFavorites);
router.get("/image/user/:user_id/favorites", getImagesFavoritesByUser);
router.get("/image/its_favorite", getIsFavorite);

export default router;
