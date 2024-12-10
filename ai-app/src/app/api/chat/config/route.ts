import { NextResponse } from "next/server";

/**
 * This API is to get config from the backend envs and expose them to the frontend
 */
export async function GET() {
    const config = {
        starterQuestions: [
            "Question 1",
            "Question 2"
        ]
    };
    return NextResponse.json(config, { status: 200 });
}
