export const fetchValidImageUrl = (imageUrl: string) => fetch(imageUrl)
		.then(() => imageUrl)
		.catch(() => '');