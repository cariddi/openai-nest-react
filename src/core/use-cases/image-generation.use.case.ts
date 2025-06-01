import type {
	ImageGenerationResponse,
	ImageGenerationResponseWithStatus,
} from '../../interfaces';
import { IMAGE_GENERATION_URL } from '../const/url';

export const imageGenerationUseCase = async (
	prompt: string,
	originalImage?: string,
	maskImage?: string
): Promise<ImageGenerationResponseWithStatus> => {
	try {
		const resp = await fetch(
			`${import.meta.env.VITE_GPT_API}/${IMAGE_GENERATION_URL}`,
			{
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ prompt, originalImage, maskImage }),
			}
		);

		if (!resp.ok) throw new Error('Failed to fetch data from the API');

		const { revised_prompt, url, openAIUrl }: ImageGenerationResponse =
			await resp.json();

		return {
			url,
			revised_prompt,
			openAIUrl,
			ok: true,
		} satisfies ImageGenerationResponseWithStatus;
	} catch (error) {
		console.log({ error });
		return IMAGE_GENERATION_ERROR_RESPONSE;
	}
};

export const IMAGE_GENERATION_ERROR_RESPONSE: ImageGenerationResponseWithStatus =
	{
		ok: false,
		url: '',
		openAIUrl: '',
		revised_prompt: '',
	};
