/** @type {import('next').NextConfig} */
const nextConfig = {
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
    }
}

module.exports = nextConfig
