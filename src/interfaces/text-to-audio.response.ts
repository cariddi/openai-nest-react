export interface TextToAudioResponse {
	audioUrl: string;
	message: string;
}

export interface TextToAudioResponseWithStatus extends TextToAudioResponse {
	ok: boolean;
}

export type TextToAudioInfo = TextToAudioResponse;
