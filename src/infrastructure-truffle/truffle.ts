import { ITruffle } from '../app/interfaces';
import { ITruffleBuild } from '../app-domain';
import { readdirSync, readFileSync } from 'fs';
import path from 'path';

export const truffle: ITruffle = {
    getContractsBuildDir(): string {
        const config = require(path.join(process.cwd(), 'truffle-config.js'));
        return config?.contracts_build_directory || './build/contracts';
    },

    async getBuilds(): Promise<ITruffleBuild[]> {
        const contractsDirectory = truffle.getContractsBuildDir();
        const builds: ITruffleBuild[] = [];

        console.log(`Looking for artifacts in "${contractsDirectory}" folder.`);
        const promises = getAllContractNamesFromDir(contractsDirectory).map((name: string) => {
            return new Promise((resolve, reject) => {

                try {
                    const build: ITruffleBuild = JSON.parse(readFileSync(`${contractsDirectory}/${name}`).toString());
                    builds.push(build);
                } catch (e) {
                    reject(e);
                }

                resolve();
            });
        });

        await Promise.all(promises).catch((e) => {
            console.log(e);
        });

        return builds;
    }
};

function getAllContractNamesFromDir(dir: string): string[] {
    return readdirSync(dir).filter((name: string) => name.endsWith('.json'));
}
