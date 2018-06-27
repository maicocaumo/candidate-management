const express = require('express')
const auth = require('./auth')
const AuthService = require('../api/user/authService')

module.exports = function (server) {

    // Rotas protegidas por Token JWT
    const protectedApi = express.Router()
    server.use('/api', protectedApi)

    protectedApi.use(auth)

    const Candidate = require('../api/candidate/candidateService')
    Candidate.register(protectedApi, '/candidates')

    // Rotas abertas
    const openApi = express.Router()
    server.use('/oapi', openApi)

    openApi.post('/login', AuthService.login)
    openApi.post('/signup', AuthService.signup)
    openApi.post('/validateToken', AuthService.validateToken)
}