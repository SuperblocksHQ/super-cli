import { ISuperBlocksClient } from '../app/interfaces';
import { Artifacts } from '../app-domain';
import { getApiBaseUrl } from './utils';
import fetch from 'node-fetch';
import fs from 'fs';
import util from 'util';
import path from 'path';

const readFileAsync = util.promisify(fs.readFile);

export const superblocksClient: ISuperBlocksClient = {
    async readDeploymentConfig() {
        const deploymentJsonPath = path.join('.superblocks', 'deployment.json');
        if (!fs.existsSync(deploymentJsonPath)) {
            throw new Error(`Expected deployment info file "${deploymentJsonPath}" does no exist. Please make sure truffle has successfully executed migrations and Super provider is configured.`);
        }
        const fileContent = await readFileAsync(deploymentJsonPath);
        return JSON.parse(fileContent.toString());
    },

    async saveArtifacts(artifactsObject: Artifacts, token: string): Promise<void> {
        const artifactsUrl = `${getApiBaseUrl()}/deployments/${artifactsObject.deploymentId}/artifacts`;

        const response = await fetch(artifactsUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'project-token': token
            },
            body:  JSON.stringify({artifacts: artifactsObject.artifactsList}) ,
        });

        if (response.ok) {
            console.log('[Superblocks Artifacts] Deployment Artifacts have been saved!');
        } else {
            const error = await response.text();
            throw new Error(`[Superblocks Artifacts] cannot save artifacts: ${error}`);
        }
    }
};
