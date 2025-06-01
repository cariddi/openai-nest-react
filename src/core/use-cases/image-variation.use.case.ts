import type {
	ImageVariationResponse,
	ImageVariationResponseWithStatus,
} from '../../interfaces';
import { IMAGE_VARIATION_URL } from '../const/url';

export const imageVariationUseCase = async (
	baseImage: string
): Promise<ImageVariationResponseWithStatus> => {
	try {
		const resp = await fetch(
			`${import.meta.env.VITE_GPT_API}/${IMAGE_VARIATION_URL}`,
			{
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ baseImage }),
			}
		);

		if (!resp.ok) throw new Error('Failed to fetch data from the API');

		const { revised_prompt, url, openAIUrl }: ImageVariationResponse =
			await resp.json();

		return {
			url,
			revised_prompt,
			openAIUrl,
			ok: true,
		} satisfies ImageVariationResponseWithStatus;
	} catch (error) {
		console.log({ error });
		return IMAGE_VARIATION_ERROR_RESPONSE;
	}
};

export const IMAGE_VARIATION_ERROR_RESPONSE: ImageVariationResponseWithStatus =
	{
		ok: false,
		url: '',
		openAIUrl: '',
		revised_prompt: '',
	};
