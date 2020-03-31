import { IABI } from '../truffle';

export interface IArtifactsModel {
    contractName: string;
    transactionHash: string;
    contractAddress: string;
    abi: IABI[];
    metadata: string;
    bytecode: string;
    sourceMap: string;
}

export interface IPersistedArtifactsModel {
    artifacts: IArtifactsModel[];
    deploymentId: string;
}
