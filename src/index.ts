import { getInput, info, setFailed } from "@actions/core";
import { context, getOctokit } from "@actions/github";
import type {
    IssueCommentCreatedEvent,
    IssueCommentEditedEvent,
} from "@octokit/webhooks-types";

const VALID_REACTIONS = [
    "+1",
    "-1",
    "laugh",
    "confused",
    "heart",
    "hooray",
    "rocket",
    "eyes",
];

async function run(): Promise<void> {
    try {
        const token = getInput("token", { required: true });

        const commentIdInput = getInput("commentId");
        const event = context.payload as
            | IssueCommentCreatedEvent
            | IssueCommentEditedEvent;

        const contextCommentId = event?.comment?.id;
        const commentId =
            commentIdInput && commentIdInput.length > 0
                ? commentIdInput
                : contextCommentId;
        info(
            `Comment ID is ${commentId} based on input of ${commentIdInput} and context of ${contextCommentId}`,
        );

        if (!commentId) {
            setFailed(
                "No commentId was provided and this is not a comment related event.",
            );
        }

        const reaction = (getInput("reaction") ?? "+1") as
            | "+1"
            | "-1"
            | "laugh"
            | "confused"
            | "heart"
            | "hooray"
            | "rocket"
            | "eyes";

        if (!VALID_REACTIONS.includes(reaction)) {
            setFailed(
                `Invalid reaction provided: ${reaction}, valid reactions: ${VALID_REACTIONS.join(
                    ",",
                )}`,
            );
        }

        const octokit = getOctokit(token);

        await octokit.rest.reactions.createForIssueComment({
            ...context.repo,
            comment_id: Number(commentId),
            content: reaction,
        });
    } catch (error) {
        setFailed((error as Error)?.message ?? "Unknown error");
    }
}

void run();
