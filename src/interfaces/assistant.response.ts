export interface QuestionResponse {
	role: 'user' | 'assistant';
	content: string[];
}

export interface AssistantResponseInfo extends QuestionResponse {}
