import { ContentImage } from 'pdfmake/interfaces';

type CustomContentImage = 
| (Omit<ContentImage, 'image' | 'text'> & { text: string; image?: never })
| (Omit<ContentImage, 'image' | 'text'> & { text?: never; image: string });


export const checkImageValidGetDef = async (
	inputImageDef: ContentImage,
	imageUrl: string
) => {
	const validUrl = await fetch(imageUrl)
	.then(() => imageUrl)
	.catch(() => '');

	if (validUrl) {
		return {
			imageDef: inputImageDef as CustomContentImage,
			image: { [inputImageDef.image]: validUrl },
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