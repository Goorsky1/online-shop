function logger(req, res, next) {
    const oldWrite = res.write;
    const oldEnd = res.end;

    const chunks = [];

    res.write = (...restArgs) => {
        chunks.push(Buffer.from(restArgs[0]));
        oldWrite.apply(res, restArgs);
    };

    res.end = (...restArgs) => {
        if (restArgs[0]) {
            chunks.push(Buffer.from(restArgs[0]));
        }
        const body = Buffer.concat(chunks).toString('utf8');
        let respBody
        try {
            respBody = JSON.parse(body)
        }
        catch (e) {
            respBody = body
        }

        console.log({
            method: req.method,
            uri: req.url,
            requestData: req.body,
            responseData: respBody,
            responseStatus: res.statusCode
        }, '\n');
        oldEnd.apply(res, restArgs);
    };

    next();
}

module.exports = logger;