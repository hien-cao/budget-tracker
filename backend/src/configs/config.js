const dev = {
    app: {
        port: process.env.PORT || 3000
    },
    db: {
        dbURL: process.env.ME_CONFIG_MONGODB_URL || ""
    }
}

const config = {dev}
const env = process.env.NODE_ENV || 'dev'

module.exports = config[env]