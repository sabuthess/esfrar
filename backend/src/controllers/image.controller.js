import { imageModel } from "../models/image.model.js";

import { upload } from "../config/multer.js";

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

			res.status(200).json({ message: "Imagen subida con exito" });
		} catch (error) {
			res.status(500).json({ message: "Internal server error" });
			console.log(error);
		}
	});
};


