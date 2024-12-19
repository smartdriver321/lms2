import cors from 'cors'
import path from 'path'
import dotenv from 'dotenv'
import express from 'express'
import cookieParser from 'cookie-parser'

import connectDB from './database/db.js'
import userRoute from './routes/user.route.js'
import mediaRoute from './routes/media.route.js'
import courseRoute from './routes/course.route.js'
import purchaseRoute from './routes/purchaseCourse.route.js'
import courseProgressRoute from './routes/courseProgress.route.js'

dotenv.config({})

const app = express()
const PORT = process.env.PORT || 3000
const __dirname = path.resolve()

// default middleware
app.use(express.json())
app.use(cookieParser())

app.use(
	cors({
		origin: 'http://localhost:5173',
		credentials: true,
	})
)

// apis
app.use('/api/v1/media', mediaRoute)
app.use('/api/v1/user', userRoute)
app.use('/api/v1/course', courseRoute)
app.use('/api/v1/purchase', purchaseRoute)
app.use('/api/v1/progress', courseProgressRoute)

if (process.env.NODE_ENV === 'production') {
	app.use(express.static(path.join(__dirname, '../client/dist')))

	app.get('*', (req, res) => {
		res.sendFile(path.join(__dirname, '../client', 'dist', 'index.html'))
	})
}

app.listen(PORT, async () => {
	await connectDB()
	console.log(`Server listen at port ${PORT}`)
})
