const restful = require('node-restful')
const mongoose = restful.mongoose

const candidateSchema = new mongoose.Schema({
    nome: { type: String, required: true },
    cpf: { type: Number, required: true },
    telefone: { type: Number, required: true },
    endereco: { type: String, required: false },
    sexo: { type: String, required: true, uppercase: true, enum: ['FEMININO', 'MASCULINO']},
    idade: { type: Number, required: false },
    termoResponsabilidade: { type: Boolean, required: false }
})

module.exports = restful.model('Candidate', candidateSchema)