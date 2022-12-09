export default class RequestHandler {
    static init(req, res, next) {
        res.respond = RequestHandler.success(req, res);
        res.failCase = RequestHandler.failure(req, res);
        next()
    }
    static success(req, res) {
        // do garbage collection
        return (data, status = 200) => {
            res.status(status).send(data)
        }
    }
    static failure(req, res) {
        // go garbage collection and error haldling
        return (data, status = 500) => {
            res.status(status).send(data)
        }
    }
}
