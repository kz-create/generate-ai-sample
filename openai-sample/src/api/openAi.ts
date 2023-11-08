import fs from "fs";
import OpenAI, { toFile } from "openai";

const removeUrl = "https://sdk.photoroom.com/v1/segment";
const generateUrl = "https://beta-sdk.photoroom.com/v1/instant-backgrounds";
const editUrl = "https://api.openai.com/v1/images/edits";

const openApiKey = process.env.NEXT_PUBLIC_OPEN_AI_API_KEY;
const openai = new OpenAI({
	apiKey: openApiKey,
	dangerouslyAllowBrowser: true,
});

export async function generateImage(imageFile: File): Promise<Blob> {
	const formData = new FormData();
	formData.append("image_file", imageFile);

	const response = await fetch(removeUrl, {
		method: "POST",
		headers: {
			"X-Api-Key": openApiKey,
		},
		body: formData,
	});

	if (!response.ok) {
		console.error(response.json());
		throw new Error("Network response was not ok");
	}

	const imageBlob: Blob = await response.blob();

	return imageBlob;
}

export async function editImage(filePath: string, prompt: string) {
	const response = await openai.images.edit({
		image: fs.createReadStream(filePath),
		prompt: prompt,
		mask: fs.createReadStream(filePath),
		response_format: "url",
		n: 1,
		size: "512x512",
	});

	return response.data;
}

export async function variationImage(
	imageFile: File,
	prompt: string,
): Promise<OpenAI.Images.Image[]> {
	const formData = new FormData();
	formData.append("prompt", prompt);
	formData.append("imageFile", imageFile);

	const image = await openai.images.createVariation({
		image: imageFile.stream(),
		n: 1,
		response_format: "b64_json",
		size: "256x256",
	});

	return image.data;
}
