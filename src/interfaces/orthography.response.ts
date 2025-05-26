export interface OrthographyResponse {
	userScore: number;
	errors: string[];
	message: string;
}

export interface OrthographyResponseWithStatus extends OrthographyResponse {
	ok: boolean;
}

export type OrthographyInfo = OrthographyResponse;
