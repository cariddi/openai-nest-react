import type {
	ProsConsResponse,
	ProsConsResponseWithStatus,
} from '../../../interfaces';
import { PROS_CONS_URL } from '../../const/url';

export const prosConsUseCase = async (
	prompt: string
): Promise<ProsConsResponseWithStatus> => {
	try {
		const resp = await fetch(
			`${import.meta.env.VITE_GPT_API}/${PROS_CONS_URL}`,
			{
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ prompt }),
			}
		);

		if (!resp.ok) throw new Error('Failed to fetch data from the API');

		const data: ProsConsResponse = await resp.json();

		return {
			ok: true,
			...data,
		} satisfies ProsConsResponseWithStatus;
	} catch (error) {
		console.log({ error });

		return PROS_CONS_ERROR_RESPONSE;
	}
};

export const PROS_CONS_ERROR_RESPONSE: ProsConsResponseWithStatus = {
	ok: false,
	content: 'Could not proccess the propmt',
	annotations: [],
	refusal: null,
	role: 'assistant',
};
