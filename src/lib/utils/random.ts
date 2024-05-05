import { generateId } from 'lucia'

export const createId = (length: number) => generateId(length)

export const random = (min: number, max: number) => {
	return Math.max(min, Math.floor(Math.random() * max))
}

export const randomColor = () => {
	// Generate random hue (0-360 degrees) and saturation (0-1)
	const hue = Math.floor(Math.random() * 360)
	const saturation = Math.random()

	// Set lightness to a high value (e.g., 0.7 for light colors)
	const lightness = 0.5

	return `hsl(${hue}, ${saturation * 100}%, ${lightness * 100}%)`
}

export const getInitials = (str: string) =>
	str
		.split(' ')
		.map((n) => n[0])
		.join('')

// function generateAvatar(
// 	text,
// 	foregroundColor = 'white',
// 	backgroundColor = 'black'
// ) {
// 	const canvas = document.createElement('canvas')
// 	const context = canvas.getContext('2d') as CanvasRenderingContext2D

// 	canvas.width = 200
// 	canvas.height = 200

// 	// Draw background

// 	context.fillStyle = backgroundColor
// 	context.fillRect(0, 0, canvas.width, canvas.height)

// 	// Draw text

// 	context.font = 'bold 100px Assistant'
// 	context.fillStyle = foregroundColor
// 	context.textAlign = 'center'
// 	context.textBaseline = 'middle'
// 	context.fillText(text, canvas.width / 2, canvas.height / 2)

// 	let blob

// 	return canvas.toBlob('image/png')
// }
