const express = require('express')

module.exports = function(server) {

    const router = express.Router()
    server.use('/api', router)

    const Candidate = require('../api/candidate/candidateService')
    Candidate.register(router, '/candidates')
}