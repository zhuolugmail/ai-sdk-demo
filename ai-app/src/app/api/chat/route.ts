
import { streamText } from 'ai';
import { createMistral } from '@ai-sdk/mistral';

const mistral = createMistral({
    // custom settings
    baseURL: process.env.MISTRAL_URL,
});

const model = mistral(process.env.MODEL_NAME || '');

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

export async function POST(req: Request) {
    const { messages } = await req.json();

    const result = streamText({
        model: model,
        messages,
    });

    return result.toDataStreamResponse();
}

