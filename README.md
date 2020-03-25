# Superblocks CLI

[![Superblocks](https://superblocks.com/d/superblocks/projects/superblocks-platform.svg?branch=master)](https://superblocks.com/d/superblocks/projects/superblocks-platform)

Superblocks CLI tool to be used with [Superblocks platform](https://superblocks.com/).

## Supported Framworks
- Truffle

## Installation

Superblocks CLI can be installed or used using npx. In order to install run:

```
npm i superblocks-cli
```

Now you can use the tool using _superblocks-cli_ or _super_ commands. Thus:
```
superblocks-cli collect-artifacts
```
and
```
super collect-artifacts
```
are identical commands.

## Collect artifacts

If you would like to interact with your deployed contracts manually or via the Superblocks platform, we provide the opportunity to store deployment artifacts, so that the deployed contracts can be interacted with easily.

If right after truffle deployment you run _collect-artifact_ command:
```
npx superblocks-cli collect-artifacts
```
the deployment artifacts will be automatically sent to Superblocks platform servers, where they can be accessed by navigating to the Artifacts tab in deployments. Example: [Truffle Reference Project](https://github.com/SuperblocksHQ/truffle-reference-project).
