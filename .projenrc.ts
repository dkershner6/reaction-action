import { Node20GitHubActionTypescriptProject } from "dkershner6-projen-github-actions";
import { RunsUsing } from "projen-github-action-typescript";

const MAJOR_VERSION = 3;

const project = new Node20GitHubActionTypescriptProject({
    majorVersion: MAJOR_VERSION,
    defaultReleaseBranch: "main",
    minNodeVersion: "24.0.0",
    maxNodeVersion: "24.0.0",
    workflowNodeVersion: "24.0.0",

    devDeps: [
        "dkershner6-projen-github-actions",
        "projen-github-action-typescript",
    ],
    name: "reaction-action",
    description: "A GitHub Action to React to an Issue or Pull Request comment",

    actionMetadata: {
        name: "Comment Reaction",
        description: "React to a comment within a GitHub Issue or Pull Request",
        inputs: {
            token: {
                required: true,
                description:
                    "GitHub token. The standard GITHUB_TOKEN will do just fine.",
            },
            commentId: {
                required: false,
                description:
                    "The comment ID to react to. Required if the triggering event is not comment related.",
            },
            reaction: {
                required: false,
                description:
                    "Must be a valid reaction type: https://docs.github.com/en/rest/reference/reactions#reaction-types",
                default: "+1",
            },
        },
        runs: {
            // NODE_24 not yet in projen-github-action-typescript RunsUsing enum
            using: "node24" as RunsUsing,
            main: "dist/index.js",
        },
        branding: {
            icon: "alert-octagon",
            color: "yellow",
        },
    },

    deps: ["@octokit/webhooks-types"],

    autoApproveOptions: {
        allowedUsernames: ["dkershner6"],
    },

    sampleCode: false,
    docgen: true,
});

project.synth();
