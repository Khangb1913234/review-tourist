const config = {
    app: {
        port: process.env.PORT || 8080,
    },
    db: {
        uri: process.env.MONGODB_URI || "mongodb://localhost:27017/review_tourist"
    },
    jwt: {
        secret: process.env.JWT_SECRET || "tourist-secret-key",
    }
}

module.exports = config;