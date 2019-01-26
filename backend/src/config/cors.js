module.exports = function(req, res, next) {
    const methods = 'GET, POST, OPTIONS, PUT, PATCH, DELETE'
    const headers = 'Origin, X-Requested-With, Content-Type, Accept'

    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Methods', methods)
    res.header('Access-Control-Allow-Headers', headers)

    next()
}