# Issue or Pull Request Comment Reaction

React to any comment with the GitHub Reaction types.

## Usage

```yaml
- name: React to comment
  uses: dkershner6/reaction-action@v3 # You can also use a specific version, e.g. v3.0.0
  with:
    token: ${{ secrets.GITHUB_TOKEN }}
    commentId: 1234 # Optional if the trigger is a comment. Use another action to find this otherwise.
    reaction: "hooray" # Optional, defaults to +1
```

## Migration from v2

Version 3 updates the GitHub Actions runtime from Node 20 to Node 24. This is a breaking change required by [GitHub's Node 20 deprecation](https://github.blog/changelog/2025-09-19-deprecation-of-node-20-on-github-actions-runners/).

- **v3** — runs on `node24` (recommended)
- **v2** — runs on `node20` (deprecated; pin `@v2` only if you must stay on Node 20 temporarily)

## Valid reactions (if this is incomplete, please open an issue)

```typescript
const VALID_REACTIONS = [
    '+1',
    '-1',
    'laugh',
    'confused',
    'heart',
    'hooray',
    'rocket',
    'eyes',
];
```

## Contributing

All contributions are welcome, please open an issue or pull request.

To use this repository:
1. `npm i -g pnpm` (if don't have pnpm installed)
2. `pnpm i`
3. `npx projen` (this will ensure everything is setup correctly, and you can run this command at any time)
4. Good to make your changes!
5. You can run `npx projen build` at any time to build the project.