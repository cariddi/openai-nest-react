import type { ProsConsStreamResponseWithStatus } from '../../interfaces';
import { PROS_CONS_STREAM_URL } from '../const/url';

export async function* prosConsStreamGeneratorUseCase(
	prompt: string,
	abortSignal: AbortSignal
) {
	try {
		const resp = await fetch(
			`${import.meta.env.VITE_GPT_API}/${PROS_CONS_STREAM_URL}`,
			{
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ prompt }),
				signal: abortSignal,
			}
		);

		if (!resp.ok) throw new Error('Failed to fetch data from the API');

		const reader = resp.body!.getReader();
		if (!reader) {
			console.log("couldn't get reader from response body");
			return null;
		}

		const decoder = new TextDecoder();
		let text = '';

		while (true) {
			const { done, value } = await reader.read();

			if (done) break;

			text += decoder.decode(value, { stream: true });
			yield text;
		}
	} catch (error) {
		console.log({ error });

		return null;
	}
}

export const PROS_CONS_STREAM_GENERATOR_ERROR_RESPONSE: ProsConsStreamResponseWithStatus =
	{
		ok: false,
		content: 'Could not proccess the propmt',
		annotations: [],
		refusal: null,
		role: 'assistant',
	};
