export interface ImageVariationResponse {
	url: string;
	openAIUrl: string;
	revised_prompt: string;
}

export interface ImageVariationResponseWithStatus
	extends ImageVariationResponse {
	ok: boolean;
}

export type ImageVariationInfo = {
	imageUrl: string;
	alt: string; // could be the revised_prompt field
};
