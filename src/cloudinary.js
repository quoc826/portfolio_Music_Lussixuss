const CLOUD_NAME = "dkrdckipr";
const UPLOAD_PRESET = "fashgyrn";

/**
 * Upload a file to Cloudinary (images, audio, video, etc.)
 * @param {File} file - The file to upload
 * @param {string} folder - Optional folder name in Cloudinary
 * @returns {Promise<string>} - The URL of the uploaded file
 */
export async function uploadToCloudinary(file, folder = "lussixuss") {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", UPLOAD_PRESET);
    formData.append("folder", folder);

    const response = await fetch(
        `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/auto/upload`,
        {
            method: "POST",
            body: formData,
        }
    );

    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error?.message || "Upload failed");
    }

    const data = await response.json();
    return data.secure_url;
}

/**
 * Optimize a Cloudinary delivery URL by injecting auto format, auto quality, and specific width.
 * @param {string} url - The original Cloudinary URL
 * @param {number} width - Target width (default 400)
 * @returns {string} - The optimized URL
 */
export function optimizeCloudinaryUrl(url, width = 400) {
    if (!url || !url.includes("res.cloudinary.com")) return url;
    // Replace "/upload/" with "/upload/f_auto,q_auto,w_XXX/"
    return url.replace("/upload/", `/upload/f_auto,q_auto,w_${width}/`);
}
