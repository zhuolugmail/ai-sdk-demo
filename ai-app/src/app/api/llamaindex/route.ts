
import {
    ChatSummaryMemoryBuffer,
    MistralAI,
    SimpleChatEngine,
} from "llamaindex";

import { toDataStreamResponse } from '../../../streams/llamaindex-adapter'

export async function POST(req: Request) {
    const { messages } = await req.json();

    // Set maxTokens to 75% of the context window size of 4096
    // This will trigger the summarizer once the chat history reaches 25% of the context window size (1024 tokens)
    /* const llm = new Ollama(
        {
            model: process.env.MODEL_NAME,
            maxTokens: 4096,
            config: {
                host: 'http://ollama:11434',
            },
            options: {
                num_ctx: 32 * 1024,
            }
        }
    );
    */
    const llm = new MistralAI({
        model: process.env.MODEL_NAME,
        maxTokens: 4096
    })

    const previousMessages = messages.slice(0, messages.length - 1)
    const message = messages[messages.length - 1].content

    const chatHistory = new ChatSummaryMemoryBuffer({
        messages: previousMessages,
        llm 
    });
    const chatEngine = new SimpleChatEngine({ llm });

    const stream = await chatEngine.chat({
        message,
        chatHistory,
        stream: true,
    });

    return toDataStreamResponse(
        stream
    );
}


