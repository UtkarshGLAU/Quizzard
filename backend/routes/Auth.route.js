import express from 'express'
import { getUser, login, logout } from '../controller/Auth.controller.js'

const AuthRoute = express.Router()

AuthRoute.post('/google-login', login)
AuthRoute.post("/logout", logout);
AuthRoute.get('/get-user', getUser)
export default AuthRoute