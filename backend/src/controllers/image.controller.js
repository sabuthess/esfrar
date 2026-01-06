import { imageModel } from "../models/image.model.js";

import { upload } from "../config/multer.js";
import { configDotenv } from "dotenv";

export const uploadImage = (req, res) => {
	upload.single("file")(req, res, async (err) => {
		try {
			let { user_id, title, location, tags, description } = req.body;

			await imageModel.create_image({
				user_id,
				title,
				location,
				tags: JSON.stringify(tags),
				description,
				file_name: req.file.filename,
				file_path: `uploads/${req.file.filename}`,
			});

			res.status(201).json({ message: "Imagen subida con exito" });
		} catch (error) {
			res.status(500).json({ message: "Internal server error" });
			console.log(error);
		}
	});
};

export const deleteImage = async (req, res) => {
	try {
		let { user_id, image_id } = req.body;

		await imageModel.delete_image({ user_id, image_id });
		res.status(200).json({ message: "Imagen eliminada con exito" });
	} catch (error) {
		res.status(500).json({ message: "No se pudo eliminar la imagen" });
		console.log(error);
	}
};

export const getAllImages = async (req, res) => {
	try {
		const result = await imageModel.get_all_images();

		res
			.status(200)
			.json({ data: result, message: "Imagenes obtenidas successfully" });
	} catch (error) {
		res.status(500).json({ message: "No se pudo obtener todas las imagenes" });
		console.log(error);
	}
};
// ver por que no trae las imagenes
export const getImagesByUser = async (req, res) => {
	try {
		let { user_id } = await req.params;
		const result = await imageModel.get_images_by_user({ user_id });
		console.log(user_id);

		res.status(200).json({
			data: result,
			message: "Imagenes del usuario obtenidas exitoxamente",
		});
	} catch (error) {
		res
			.status(500)
			.json({ message: "No se pudo obtener las imagenes del usuario" });
		console.log(error);
	}
};

export const getASingleImage = async (req, res) => {
	try {
		let { image_id } = await req.params;
		const result = await imageModel.get_a_single_image({ image_id });
		console.log(image_id);

		res
			.status(200)
			.json({ data: result, message: "Imagen obtenida exitoxamente" });
	} catch (error) {
		res.status(500).json({ message: "No se pudo obtener la imagen" });
		console.log(error);
	}
};

export const getSearchImages = async (req, res) => {
	try {
		let { search } = await req.query;
		const result = await imageModel.get_search_images({ query: search.trim() });

		res
			.status(200)
			.json({ data: result, message: "Imagenes obtenidas exitoxamente" });
	} catch (error) {
		res
			.status(500)
			.json({ message: "No se pudo obtener las imagenes guardadas" });
		console.log(error);
	}
};

// Logic of favorites

export const addImageToFavorites = async (req, res) => {
	try {
		let { image_id } = await req.params;
		let { user_id } = await req.body;

		await imageModel.add_to_favorites({ image_id, user_id });
		res.status(200).json({
			message: "Imagen añadida a favoritos con exito",
		});
	} catch (error) {
		res.status(500).json({ message: "No puede añadir a favoritos la imagen" });
		console.log(error);
	}
};

export const removeImageFromFavorites = async (req, res) => {
	try {
		let { image_id } = await req.params;
		let { user_id } = await req.body;

		await imageModel.remove_from_favorites({
			image_id,
			user_id,
		});
		res.status(200).json({
			message: "Imagen eliminada de favoritos con exito",
		});
	} catch (error) {
		res
			.status(500)
			.json({ message: "No puede eliminar de favoritos la imagen" });
		console.log(error);
	}
};

export const getImagesFavoritesByUser = async (req, res) => {
	try {
		let { user_id } = await req.params;

		const result = await imageModel.get_images_favorites_by_user({ user_id });
		res.status(200).json({
			data: result,
			message: "Imagenes obtenidas de favoritos con exito",
		});
	} catch (error) {
		res
			.status(500)
			.json({ message: "No puede obtener de favoritos las imagenes" });
		console.log(error);
	}
};

export const getIsFavorite = async (req, res) => {
	let { image_id, user_id } = await req.body;

	const result = await imageModel.its_on_favorites({ image_id, user_id });

	if (result == "Is favorite") {
		res.status(200).json({
			message: "La imagen esta en favoritos",
		});
	} else {
		res.status(200).json({
			message: "La imagen no esta en favoritos",
		});
	}
};
