import dotenv from 'dotenv'
import { v2 as cloudinary } from 'cloudinary'

dotenv.config({})

cloudinary.config({
	cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
	api_key: process.env.CLOUDINARY_API_KEY,
	api_secret: process.env.CLOUDINARY_API_SECRET,
})

export const uploadMedia = async (file) => {
	try {
		const uploadResponse = await cloudinary.uploader.upload(file, {
			resource_type: 'auto',
			folder: 'lms2',
		})
		return uploadResponse
	} catch (error) {
		console.log(error)
	}
}

export const deleteMediaFromCloudinary = async (publicId) => {
	try {
		await cloudinary.uploader.destroy(publicId)
	} catch (error) {
		console.log(error)
	}
}

export const deleteVideoFromCloudinary = async (publicId) => {
	try {
		await cloudinary.uploader.destroy(publicId, {
			resource_type: 'video',
		})
	} catch (error) {
		console.log(error)
	}
}
