

exports.manipulaErros = (msg, erro, res) => {

    return res.status(400).json(`${msg},${erro}`)
}