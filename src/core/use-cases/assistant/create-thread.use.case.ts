import { CREATE_THREAD_URL } from '../../const/url';

export const createThreadUseCase = async () => {
	try {
		const resp = await fetch(
			`${import.meta.env.VITE_ASSISTANT_API}/${CREATE_THREAD_URL}`,
			{
				method: 'POST',
			}
		);

		if (!resp.ok) throw new Error('Failed to fetch data from the API');

		const { id } = (await resp.json()) as { id: string };

		return id;
	} catch (error) {
		console.log({ error });

		throw new Error('Error creating thread');
	}
};
