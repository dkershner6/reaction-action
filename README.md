# Issue or Pull Request Comment Reaction

React to any comment with the GitHub Reaction types.

## Usage

```yaml
- name: React to comment
  uses: dkershner6/reaction-action@v2 # You can also use a specific version, e.g. v2.0.0
  with:
    token: ${{ secrets.GITHUB_TOKEN }}
    commentId: 1234 # Optional if the trigger is a comment. Use another action to find this otherwise.
    reaction: "hooray" # Optional, defaults to +1
```

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