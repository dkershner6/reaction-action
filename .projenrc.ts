import { JobPermission } from "projen/lib/github/workflows-model";
import { NodePackageManager } from "projen/lib/javascript";
import {
  GitHubActionTypeScriptProject,
  RunsUsing,
} from "projen-github-action-typescript";

const MAJOR_VERSION = 2;

const project = new GitHubActionTypeScriptProject({
  packageManager: NodePackageManager.PNPM,
  minNodeVersion: "20.10.0",

  majorVersion: MAJOR_VERSION,
  defaultReleaseBranch: "main",

  devDeps: ["projen-github-action-typescript"],
  name: "reaction-action",
  projenrcTs: true,
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
      using: RunsUsing.NODE_20,
      main: "dist/index.js",
    },
    branding: {
      icon: "alert-octagon",
      color: "yellow",
    },
  },

  deps: ["@octokit/webhooks-types"] /* Runtime dependencies of this module. */,

  prettier: true,
  autoApproveOptions: {
    allowedUsernames: ["dkershner6"],
  },

  sampleCode: false,
  docgen: true,
});

const releaseWorkflow = project.github?.tryFindWorkflow("release");
if (releaseWorkflow) {
  releaseWorkflow.addJob("major-release", {
    runsOn: ["ubuntu-latest"],
    needs: ["release_github"],
    permissions: {
      contents: JobPermission.WRITE,
    },
    steps: [
      {
        uses: "actions/checkout@v3",
      },
      {
        uses: "ncipollo/release-action@v1",
        with: {
          generateReleaseNotes: true,
          tag: `v${MAJOR_VERSION}`,
          token: "${{ secrets.GITHUB_TOKEN }}",
        },
      },
    ],
  });
}

project.synth();
