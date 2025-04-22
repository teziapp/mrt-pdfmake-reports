import { ContentImage } from 'pdfmake/interfaces';

type CustomContentImage = 
| (Omit<ContentImage, 'image' | 'text'> & { text: string; image?: never })
| (Omit<ContentImage, 'image' | 'text'> & { text?: never; image: string });

interface ImageHeaders {
	[key: string]: string;
}

export const checkImageValidGetDef = async (
	inputImageDef: ContentImage,
	imageUrl: string,
	headers?: ImageHeaders
) => {
	const validUrl = await fetch(imageUrl, {
		headers: headers || {}
	})
	.then(() => imageUrl)
	.catch(() => '');

	if (validUrl) {
		const imageValue = headers 
			? { url: validUrl, headers } 
			: validUrl;

		return {
			imageDef: inputImageDef as CustomContentImage,
			image: { [inputImageDef.image]: imageValue },
		}
	} else {
		const { image, ...imageDef } = inputImageDef
		return { 
			imageDef: {
				...imageDef,
				text: '',
			} as CustomContentImage
		};
	}
}