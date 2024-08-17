import jwt from 'jsonwebtoken'
import config from '../../config'

const generateAccessToken = (id: number, username: string) => {
  // this acess token expires in 1 hour
  return jwt.sign({id, username}, config.JWT_ACCESS_TOKEN_KEY, {expiresIn: Math.floor(Date.now() / 1000) + (60 * 60)})
}

const generateRefreshToken = (id: number, username: string) => {
  // this refresh token expires in 30 days
  return jwt.sign({id, username}, config.JWT_REFRESH_TOKEN_KEY, {expiresIn: '1d'})
}

const verifyToken = (token: string) => {
  return jwt.verify(token, config.JWT_ACCESS_TOKEN_KEY)
}

export {
  generateAccessToken,
  generateRefreshToken,
  verifyToken
}