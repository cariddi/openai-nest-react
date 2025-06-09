import type {
	OrthographyResponse,
	OrthographyResponseWithStatus,
} from '../../../interfaces';
import { ORTHOGRAPHY_URL } from '../../const/url';

export const orthographyUseCase = async (
	prompt: string
): Promise<OrthographyResponseWithStatus> => {
	try {
		const resp = await fetch(
			`${import.meta.env.VITE_GPT_API}/${ORTHOGRAPHY_URL}`,
			{
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ prompt }),
			}
		);

		if (!resp.ok) throw new Error('Failed to fetch data from the API');

		const data: OrthographyResponse = await resp.json();

		return {
			ok: true,
			...data,
		} satisfies OrthographyResponseWithStatus;
	} catch (error) {
		console.log({ error });

		return ORTHOGRAPHY_ERROR_RESPONSE;
	}
};

export const ORTHOGRAPHY_ERROR_RESPONSE: OrthographyResponseWithStatus = {
	ok: false,
	userScore: 0,
	errors: [],
	message: 'Could not proccess the propmt',
};
