import type {
	AudioToTextResponse,
	AudioToTextResponseWithStatus,
} from '../../interfaces';
import { AUDIO_TO_TEXT_URL } from '../const/url';

export const audioToTextUseCase = async (
	audioFile: File,
	prompt?: string
): Promise<AudioToTextResponseWithStatus> => {
	try {
		const formData = new FormData();

		if (prompt) formData.append('prompt', prompt);
		formData.append('file', audioFile);

		console.log({ formData });

		const resp = await fetch(
			`${import.meta.env.VITE_GPT_API}/${AUDIO_TO_TEXT_URL}`,
			{
				method: 'POST',
				body: formData,
			}
		);

		if (!resp.ok) throw new Error('Failed to fetch data from the API');

		const data: AudioToTextResponse = await resp.json();

		return {
			ok: true,
			...data,
		} satisfies AudioToTextResponseWithStatus;
	} catch (error) {
		console.log({ error });

		return AUDIO_TO_TEXT_ERROR_RESPONSE;
	}
};

export const AUDIO_TO_TEXT_ERROR_RESPONSE: AudioToTextResponseWithStatus = {
	ok: false,
	task: '',
	language: '',
	duration: 0,
	text: 'Could not proccess the propmt',
	segments: [],
};
