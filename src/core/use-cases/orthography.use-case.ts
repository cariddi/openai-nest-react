import type {
	OrthographyResponse,
	OrthographyResponseWithStatus,
} from '../../interfaces';

export const orthographyUseCase = async (
	prompt: string
): Promise<OrthographyResponseWithStatus> => {
	try {
		const resp = await fetch(
			`${import.meta.env.VITE_GPT_API}/orthography-check`,
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
		};
	} catch (error) {
		console.log({ error });

		return {
			ok: false,
			userScore: 0,
			errors: [],
			message: 'Could not proccess the propmt',
		};
	}
};
