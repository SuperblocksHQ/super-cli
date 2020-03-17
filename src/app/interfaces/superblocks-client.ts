import { Artifacts, IDeploymentConfig } from '../../app-domain';

export interface ISuperBlocksClient {
    saveArtifacts(artifacts: Artifacts, token: string): Promise<void>;
    readDeploymentConfig(): Promise<IDeploymentConfig>;
}
