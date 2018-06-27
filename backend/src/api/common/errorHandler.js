const _ = require('lodash')

module.exports = (req, res, next) => {

    const bundle = res.locals.bundle

    if (bundle.errors) {

        const errors = parseErrors(bundle.errors)
        res.status(500).json({errors})

    } else if(bundle.code == 11000) {

        res.status(409).json({'errors': ['Duplicate register']})


    } else {
        next()
    }
}

const parseErrors = (nodeRestfulErrors) => {
    const errors = []
    _.forIn(nodeRestfulErrors, error => {
        errors.push(error.message)
    })
    return errors
}