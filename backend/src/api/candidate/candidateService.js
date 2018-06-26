const Candidate = require('./candidate')
const errorHandler = require('../common/errorHandler')

Candidate.methods(['get', 'post', 'put', 'delete'])
Candidate.updateOptions({new: true, runValidators: true})
Candidate.after('post', errorHandler).after('put', errorHandler)

Candidate.route('termoResponsabilidadeTrue', function(req, res, next) {
    Candidate.find({ termoResponsabilidade: 'true' }, (error, value) => {
        if(error) {
            res.status(500).json({errors: [error]})
        } else {
            res.json(value)
        }
    })
});

module.exports = Candidate