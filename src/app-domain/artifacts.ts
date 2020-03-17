import { ITruffleBuild, IArtifactsModel } from './models';

export class Artifacts {
    private readonly _deploymentId: string;
    private readonly _artifacts: IArtifactsModel[];

    constructor(deploymentId: string, artifacts: ITruffleBuild[]) {
        if (!deploymentId || !artifacts) {
            throw new Error('Invalid parameters while creating artifacts');
        }
        this._deploymentId = deploymentId;
        this._artifacts = artifacts.map<IArtifactsModel>(a => {
            const { contractName, abi, metadata, bytecode, sourceMap } = a;
            return { contractName, abi, metadata, bytecode, sourceMap };
        });
    }

    get deploymentId() { return this._deploymentId; }
    get artifactsList() { return this._artifacts; }
}
