import { JobPermission } from "projen/lib/github/workflows-model";
import { NodePackageManager } from "projen/lib/javascript";
import {
  GitHubActionTypeScriptProject,
  RunsUsing,
} from "projen-github-action-typescript";

const project = new GitHubActionTypeScriptProject({
  packageManager: NodePackageManager.NPM,
  minNodeVersion: "20.10.0",

  majorVersion: 2,
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
});

const mainVersionTagWorkflow = project.github?.addWorkflow(
  "Update Main Version Tag",
);
if (mainVersionTagWorkflow) {
  mainVersionTagWorkflow.on({
    workflowDispatch: {
      inputs: {
        target: {
          description: "The target tag to update the main tag to",
          required: true,
        },
        mainVersion: {
          type: "choice",
          description: "The main version to update",
          options: ["v2"],
        },
      },
    },
  });

  mainVersionTagWorkflow.addJob("tag", {
    runsOn: ["ubuntu-latest"],
    permissions: {
      contents: JobPermission.READ,
    },
    steps: [
      {
        name: "Checkout",
        uses: "actions/checkout@v2",
        with: {
          "fetch-depth": 0,
        },
      },
      {
        name: "Git config",
        run: "git config user.name github-actions && git config user.email github-actions@github.com",
      },
      {
        name: "Tag New Target",
        run: "git tag -f ${{ github.event.inputs.major_version }} ${{ github.event.inputs.target }}",
      },
      {
        name: "Push Tag",
        run: "git push origin ${{ github.event.inputs.major_version }} --force",
      },
    ],
  });
}

project.synth();
