import { ISuperBlocksClient, ITruffle } from '../interfaces';
import { Artifacts } from '../../app-domain';

export class CollectArtifactsCommand {
    private readonly truffle: ITruffle;
    private readonly superblocksClient: ISuperBlocksClient;

    constructor(truffle: ITruffle, superBlocksClient: ISuperBlocksClient) {
        this.truffle = truffle;
        this.superblocksClient = superBlocksClient;
    }

    async execute() {
        const superConfig = await this.superblocksClient.readDeploymentConfig();

        if (!superConfig.token) {
            throw new Error('[Superblocks Artifacts] Project Token is not set.');
        }
        const builds = await this.truffle.getBuilds();

        const artifacts = new Artifacts(superConfig.deploymentId, builds);
        await this.superblocksClient.saveArtifacts(artifacts, superConfig.token);
    }
}
