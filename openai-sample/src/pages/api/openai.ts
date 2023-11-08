import { editImage } from "@/api/openAi";

export default async function handler(req, res) {
	const body = JSON.parse(req.body);
	const images = await editImage(body.filePath, body.prompt);
	res.status(200).json(images);
}
