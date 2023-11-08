import { editImage } from "@/api/openAi";

export default async function handler(req, res) {
	const images = await editImage(req.body.filepath, req.body.prompt);
	res.status(200).json(images);
}
