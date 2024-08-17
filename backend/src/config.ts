import dotenv from 'dotenv'
dotenv.config()

const config = {
  PORT: process.env.PORT || 3000,
  JWT_ACCESS_TOKEN_KEY: process.env.JWT_ACCESS_TOKEN_KEY || 'generic',
  JWT_REFRESH_TOKEN_KEY: process.env.JWT_REFRESH_TOKEN_KEY || 'generic'
}

export default config