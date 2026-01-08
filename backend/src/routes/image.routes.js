import express from "express";
import {
	addImageToFavorites,
	addImageToLikes,
	deleteImage,
	getAllImages,
	getASingleImage,
	getImagesByUser,
	getImagesFavoritesByUser,
	getImagesLikesByUser,
	getIsFavorite,
	getIsLike,
	getSearchImages,
	removeImageFromFavorites,
	removeImageFromLikes,
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
router.get("/image/user/:user_id/favorites", getImagesFavoritesByUser);
router.get("/image/its_favorite", getIsFavorite);
router.post("/image/favorite/:image_id", addImageToFavorites);
router.delete("/image/favorite/:image_id", removeImageFromFavorites);


// Logic of likes
router.get("/image/user/:user_id/likes", getImagesLikesByUser);
router.get("/image/its_like", getIsLike);
router.post("/image/like/:image_id", addImageToLikes);
router.delete("/image/like/:image_id", removeImageFromLikes);

export default router;
