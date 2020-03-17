import { ITruffleBuild } from '../../app-domain';

export interface ITruffle {
    getContractsBuildDir(): string;
    getBuilds(): Promise<ITruffleBuild[]>;
}
