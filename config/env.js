import * as dotEnv from 'dotenv'

dotEnv.config({
    path: './config/.env',
});
function parseArray(data) {
    if (!data) { return undefined }
    return data.split(' ')
}
class PrivateConfig {
    constructor() {
        this.port = process.env.PORT;
        this.allowedDomains = parseArray(process.env.ALLOWED_DOMAINS)
    }
}
class config {
    constructor() {
        throw new Error('Use config.getInstance()');
    }
    static getInstance() {
        if (!config.instance) {
            config.instance = new PrivateConfig();
        }
        this.warnUndefined()
        return config.instance;
    }
    static warnUndefined() {
        Object.entries(config.instance).forEach(([key, value]) => {
            if (!value) {
                console.log(`No env variable set for ${key}`)
            }
        });
    }
}
export default config