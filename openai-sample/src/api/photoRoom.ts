const removeUrl = 'https://sdk.photoroom.com/v1/segment';
const generateUrl = "https://beta-sdk.photoroom.com/v1/instant-backgrounds"

const apiKey = "b413f7f925b0bb3bf4acb138c928f75df93ff8df";

export async function removeBackground(imageFile: File): Promise<Blob> {
    const formData = new FormData();
    formData.append('image_file', imageFile);

    const response = await fetch(removeUrl, {
        method: 'POST',
        headers: {
            'X-Api-Key': apiKey
        },
        body: formData
    });

    if (!response.ok) {
        console.error(response.json())
        throw new Error('Network response was not ok');
    }

    const imageBlob: Blob = await response.blob();

    return imageBlob;
}

export async function generateBackground(imageFile: File, prompt: string): Promise<Blob> {
    const formData = new FormData();
    formData.append('prompt', prompt);
    formData.append('imageFile', imageFile);

    const response = await fetch(generateUrl, {
        method: 'POST',
        headers: {
            'X-Api-Key': apiKey
        },
        body: formData
    });

    if (!response.ok) {
        console.error(response.json())
        throw new Error('Network response was not ok');
    }

    const imageBlob: Blob = await response.blob();

    return imageBlob;
}
