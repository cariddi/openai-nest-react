import type {
	TranslateResponse,
	TranslateResponseWithStatus,
} from '../../interfaces';
import { TRANSLATE_URL } from '../const/url';

export const translateUseCase = async (
	prompt: string,
	lang: string
): Promise<TranslateResponseWithStatus> => {
	try {
		const resp = await fetch(
			`${import.meta.env.VITE_GPT_API}/${TRANSLATE_URL}`,
			{
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ prompt, lang }),
			}
		);

		if (!resp.ok) throw new Error('Failed to fetch data from the API');

		const data: TranslateResponse = await resp.json();

		return {
			ok: true,
			...data,
		} satisfies TranslateResponseWithStatus;
	} catch (error) {
		console.log({ error });

		return TRANSLATE_ERROR_RESPONSE;
	}
};

export const TRANSLATE_ERROR_RESPONSE: TranslateResponseWithStatus = {
	ok: false,
	message: 'Could not proccess the propmt',
};
