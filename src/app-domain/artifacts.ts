import { ITruffleBuild, IArtifactsModel, INetwork } from './models';

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
            const networkUsed: string = Object.getOwnPropertyNames(a.networks)[0];

            // @ts-ignore
            const { transactionHash, address }: INetwork = a.networks[networkUsed];

            if (!transactionHash || !address) {
                throw new Error('Network not found');
            }

            return { contractName, abi, metadata, bytecode, sourceMap, contractAddress: address, transactionHash };
        });
    }

    get deploymentId() { return this._deploymentId; }
    get artifactsList() { return this._artifacts; }
}
