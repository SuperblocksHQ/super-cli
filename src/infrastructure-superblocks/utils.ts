export function getApiBaseUrl(): string {
    return process.env.API_URL || `https://api.superblocks.com/v1`;
}
