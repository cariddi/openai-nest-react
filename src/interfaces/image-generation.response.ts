export interface Image {
	url: string;
	alt: string;
}

export type GeneratedImage = Image | null;

export interface ImageGenerationResponse {
	url: string;
	openAIUrl: string;
	revised_prompt: string;
}

export interface ImageGenerationResponseWithStatus
	extends ImageGenerationResponse {
	ok: boolean;
}

export type ImageGenerationInfo = {
	imageUrl: string;
	alt: string; // could be the revised_prompt field
};
