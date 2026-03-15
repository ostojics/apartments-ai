---
name: pr-description-generator
description: Generate a GitLab or GitHub pull request description from the current git branch diff after confirming the correct base branch. Use when the developer wants a paste-ready PR summary.
disable-model-invocation: true
---

# PR Description Generator

## Purpose

Use this skill when a developer wants a paste-ready pull request or merge request description based on the current branch diff.

This skill is for explaining the change clearly to reviewers. It is **not** a code review skill and should not spend time on broad code-quality commentary.

## Scope

This skill should:

- detect the current git branch
- determine the most likely base branch
- ask the developer to confirm or override that base branch
- analyze the diff against the confirmed base branch
- generate a concise, reviewer-friendly PR description

This skill should not:

- perform a broad code review
- push general best-practice refactors
- invent business context or ticket context
- claim tests were added unless visible in the diff
- claim performance, reliability, or maintainability improvements unless clearly supported by evidence

## Git Assumptions

Assume you can inspect the repository and use git information such as:

- current branch name
- available local and remote branches
- diff against a base branch
- changed files
- commit messages on the branch
- added, modified, or deleted tests
- config, migration, schema, CI, and deployment-related changes

## Base Branch Selection

Choose the assumed base branch using this order of preference:

1. a base branch explicitly provided by the developer
2. a clearly implied branch from repository conventions or branch naming
3. `develop` if it exists
4. otherwise `main`
5. otherwise `master`

If the branch appears to be a hotfix, release branch, or stacked branch, choose the most plausible base branch, but still require confirmation.

## First Interaction

Before analyzing the diff, summarize what you are about to do and ask for confirmation.

If the current branch is known, say:

- the current branch name
- the assumed base branch
- that you are about to compare the current branch against that base branch
- that, once confirmed, you will analyze the diff and prepare a PR description

Use this interaction style:

"I detected that you are currently on branch `<current-branch>`.
I am about to compare it against `<assumed-base-branch>` in order to generate a PR description.
Please confirm that `<assumed-base-branch>` is the correct base branch, or tell me which branch I should compare against instead.
Once confirmed, I will analyze the diff and prepare a concise PR summary covering what changed, why it appears to have changed, notable implementation details, visible testing evidence, and anything reviewers should pay attention to."

If the current branch cannot be determined, do not invent it. State that you are ready to generate the PR description, provide the assumed base branch, and ask the developer to confirm or override it.

## Analysis Requirements

After the developer confirms the base branch, inspect the diff and identify, where supported by evidence:

- the main purpose of the change
- affected modules, services, or areas of the codebase
- important behavior changes
- important implementation details
- API or contract changes
- config, migration, schema, or CI changes
- visible integration-test evidence
- notable reviewer risks or focus areas

When the diff is large, group related changes into meaningful reviewer-oriented areas instead of listing files mechanically.

## Testing Guidance

In the PR description, testing should be described factually, not judged heavily.

Focus on visible evidence such as:

- integration tests added or updated
- integration tests removed or modified
- no relevant integration-test changes visible in the diff

Do not emphasize unit tests.
Do not assume testing was performed unless there is direct evidence in the repository changes.

## Rules

- Base every claim on evidence visible in git, code, or commit history.
- If the purpose is not explicit, state that the intent was inferred from the implementation.
- Do not hallucinate business intent, deployment steps, rollout plans, or performance claims.
- Do not merely restate file names; explain the functional changes in reviewer-friendly language.
- Keep the description concise, concrete, and useful.
- Prefer clarity over completeness when the diff is noisy.
- Mention notable risks only when they are visible or reasonably inferable from the diff.

## Output Structure

The PR description should contain these sections, using concise standard Markdown:

- `## Summary`
- `## Why`
- `## What Changed`
- `## Implementation Notes`
- `## Testing`
- `## Risks`

### Section Guidance

#### Summary

Briefly explain what the PR changes.

#### Why

Explain why the change appears to have been made.
If this is not explicit, say that the reason was inferred from the implementation.

#### What Changed

List the most important changes in reviewer-friendly bullets.

#### Implementation Notes

Mention important technical details, such as:

- main modules or services touched
- data flow or control flow changes
- validation or error-handling changes
- API or contract adjustments
- migration, schema, config, CI, or deployment-related changes

#### Testing

State only what is visible in the diff.
Examples:

- Added integration test coverage for X
- Updated integration tests for Y
- No relevant integration-test changes were detected in this diff

#### Risks

Mention reviewer-relevant risk areas concisely, such as:

- backward-compatibility concerns
- behavior changes without visible integration-test updates
- migration or config sensitivity
- edge-case handling
- partial refactors or cross-cutting logic changes

## Final Response Contract

The final PR description must be returned as **raw Markdown intended for direct copy-paste into GitLab or GitHub**.

Formatting rules:

- Output exactly **one** fenced code block labeled `markdown`.
- Do **not** include any conversational text before the code block.
- Do **not** include any conversational text after the code block.
- Inside the code block, include only the final PR description.
- The contents must be ready to paste directly into a GitLab merge request description or GitHub pull request description.
- Use standard Markdown headings and bullet points only.
- Avoid HTML, tables, or unusual Markdown extensions unless clearly necessary.

## Style

Be concise, neutral, and reviewer-friendly.
Optimize for a description that a developer can copy and paste directly with minimal or no editing.
