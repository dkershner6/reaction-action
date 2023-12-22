# Issue or Pull Request Comment Reaction

React to any comment with the GitHub Reaction types.

## Usage

```yaml
- name: React to comment
  uses: dkershner6/reaction-action@v1
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