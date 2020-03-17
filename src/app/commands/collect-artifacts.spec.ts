import * as sinon from 'ts-sinon';
import chaiAsPromised from 'chai-as-promised';
import { CollectArtifactsCommand } from './collect-artifacts.command';
import { ISuperBlocksClient, ITruffle } from '../interfaces';
import { ITruffleBuild } from '../../app-domain/models/truffle';
import chai from 'chai';

chai.use(chaiAsPromised);
const expect = chai.expect;

describe('Harvest Artifacts Command:', () => {
    let mockSuperblocksClient: any;
    let mockTruffle: any;
    let mockTruffleBuilds: ITruffleBuild[];

    beforeEach(() => {
        mockSuperblocksClient = sinon.stubInterface<ISuperBlocksClient>({
            saveArtifacts: 'Nice',
            readDeploymentConfig: {
                deploymentId: '11111',
                token: '1111111',
            }
        });
        mockTruffleBuilds = <ITruffleBuild[]> [{
            contractName: 'contract',
        }];
        mockTruffle = sinon.stubInterface<ITruffle>({ getBuilds: mockTruffleBuilds});
    });

    describe('Execute', () => {
        it('works if called with correct arguments', async () => {
            const collectArtifactsCommand = new CollectArtifactsCommand(mockTruffle, mockSuperblocksClient);
            await collectArtifactsCommand.execute();

            sinon.default.assert.calledOnce(mockTruffle.getBuilds);
            sinon.default.assert.calledOnce(mockSuperblocksClient.saveArtifacts);
        });

        it('throws exception if token is not supplied', async () => {
            mockSuperblocksClient = sinon.stubInterface<ISuperBlocksClient>({
                saveArtifacts: () => Promise.resolve(),
                readDeploymentConfig: {
                    deploymentId: '11111',
                    token: null,
                }
            });

            const collectArtifactsCommand = new CollectArtifactsCommand(mockTruffle, mockSuperblocksClient);
            await expect(collectArtifactsCommand.execute()).to.be.rejectedWith('Project Token is not set');

            sinon.default.assert.notCalled(mockTruffle.getBuilds);
            sinon.default.assert.notCalled(mockSuperblocksClient.saveArtifacts);
        });
    });
});
