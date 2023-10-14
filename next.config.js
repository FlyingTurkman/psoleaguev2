/** @type {import('next').NextConfig} */
const nextConfig = {
    async headers() {
        return [
            {
                source: '/:path*',
                headers: [
                    { key: "Access-Control-Allow-Credentials", value: "true" },
                    { key: "Access-Control-Allow-Origin", value: "*" }, // replace this your actual origin
                    { key: "Access-Control-Allow-Methods", value: "GET,DELETE,PATCH,POST,PUT" },
                    { key: "Access-Control-Allow-Headers", value: "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, Api-Secret" }
                ]
            }
        ]
    },
    env: {
        apiSecret: process.env.apiSecret,
        mongoUri: process.env.mongoUri,
        dbName: process.env.dbName,
        appPath: process.env.appPath,
        storagePath: process.env.storagePath,
        apiKey: process.env.apiKey,
        authDomain: process.env.authDomain,
        projectId: process.env.projectId,
        storageBucket: process.env.storageBucket,
        messagingSenderId: process.env.messagingSenderId,
        appId: process.env.appId,
        measurementId: process.env.measurementId
    },
    /* FIXME: ignore build error hatasını düzelt sonra configden sil */
    typescript: {
        ignoreBuildErrors: true,
    },
    experimental: {
        serverActions: true
    }
}

module.exports = nextConfig
