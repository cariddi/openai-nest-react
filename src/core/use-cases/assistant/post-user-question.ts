import type {
	AssistantResponse,
	AssistantResponseWithStatus,
} from '../../../interfaces/assistant.response';
import { USER_QUESTION_URL } from '../../const/url';

export const postUserQuestionUseCase = async (
	threadId: string,
	question: string
) => {
	try {
		const resp = await fetch(
			`${import.meta.env.VITE_ASSISTANT_API}/${USER_QUESTION_URL}`,
			{
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ threadId, question }),
			}
		);

		if (!resp.ok) throw new Error('Failed to fetch data from the API');

		const data = (await resp.json()) as AssistantResponse;
		console.log(data);

		return {
			ok: true,
			...data,
		} satisfies AssistantResponseWithStatus;
	} catch (error) {
		console.log({ error });

		throw new Error('Error posting user question');
	}
};
