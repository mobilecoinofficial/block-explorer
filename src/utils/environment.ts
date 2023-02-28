export function checkEnvVars() {
    const vars = {
        MC_NETWORK: process.env.MC_NETWORK,
        FULL_SERVICE_URL: process.env.FULL_SERVICE_URL,
        RESERVE_AUDITOR_URL: process.env.RESERVE_AUDITOR_URL
    };

    for (const [name, value] of Object.entries(vars)) {
        if (!value) {
            console.error(`Missing env var ${name}`);
        }
    }
}
