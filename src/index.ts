#!/usr/bin/env node
import yargs = require('yargs');
import { CollectArtifactsCommand } from './app';
import { truffle } from './infrastructure-truffle';
import { superblocksClient } from './infrastructure-superblocks';

yargs.scriptName('super')
    // tslint:disable-next-line: no-empty
    .command('collect-artifacts', 'Collect artifacts from truffle after deployment.', () => {}, async () => {
        const command = new CollectArtifactsCommand(truffle, superblocksClient);
        await command.execute();
    })
    .demandCommand(1, 'Please specify super command.')
    .recommendCommands()
    .showHelpOnFail(false)
    .strict()
    .onFinishCommand(() => {
        process.exit(0);
    })
    .fail((_msg, e) => {
        console.log(e);
        process.exit(1);
     })
    .parse();
