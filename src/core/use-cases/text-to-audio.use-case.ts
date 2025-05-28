import type { TextToAudioResponseWithStatus } from '../../interfaces';
import { TEXT_TO_AUDIO_URL } from '../const/url';

export const textToAudioUseCase = async (
	prompt: string,
	voice: string
): Promise<TextToAudioResponseWithStatus> => {
	try {
		const resp = await fetch(
			`${import.meta.env.VITE_GPT_API}/${TEXT_TO_AUDIO_URL}`,
			{
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ prompt, voice }),
			}
		);

		if (!resp.ok) throw new Error('Failed to fetch data from the API');

		const audioFile = await resp.blob();
		const audioUrl = URL.createObjectURL(audioFile);

		return {
			ok: true,
			message: prompt,
			audioUrl,
		} satisfies TextToAudioResponseWithStatus;
	} catch (error) {
		console.log({ error });

		return TEXT_TO_AUDIO_ERROR_RESPONSE;
	}
};

export const TEXT_TO_AUDIO_ERROR_RESPONSE: TextToAudioResponseWithStatus = {
	ok: false,
	message: 'Could not generate audio',
	audioUrl: '',
};
