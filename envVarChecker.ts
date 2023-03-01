const envVars = ["FULL_SERVICE_URL", "RESERVE_AUDITOR_URL", "MC_NETWORK"];

export default class EnvCheckerPlugin {
    apply(compiler) {
        const missingEnvVars = [];
        console.log(process.env);
        envVars.forEach((envVar) => {
            if (!process.env[envVar]) {
                missingEnvVars.push(envVar);
            }
        });

        if (missingEnvVars.length) {
            throw new Error(
                `Missing the following env variables: ${missingEnvVars.join("\n  * ")}`
            );
        }
    }
}
