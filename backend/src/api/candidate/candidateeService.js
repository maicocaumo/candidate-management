const Candidate = require('./candidate')

Candidate.methods(['get', 'post', 'put', 'delete'])
Candidate.updateOptions({new: true, runValidators: true})

module.exports = Candidate