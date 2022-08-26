const JWT = require('jsonwebtoken');

const tokenVerification = (request, response, next) => {
    const authenticationHeader = request.headers.token;

    if (authenticationHeader) {
        const token = authenticationHeader.split(" ")[1];
        JWT.verify(token, process.env.JWT_SECRET, (error, payload) => {
            if (error) 
                response.status(403).json("Invalid token!");

            request.user = payload;
            next();
        });
    } else {
        return response.status(401).json("Not authorized!");
    }
}

const verifyTokenAndAuthorization = (request, response, next) => {
    tokenVerification(request, response, () => {
        if (request.user.id === request.params.id || request.user.isAdmin)
            next();
        else
            response.status(403).json("Not authorized!");
    });
};

const verifyTokenAndAdmin = (request, response, next) => {
    tokenVerification(request, response, () => {
        if (request.user.isAdmin)
            next();
        else
            response.status(403).json("Not authorized!");
    });
};

module.exports = { tokenVerification, verifyTokenAndAuthorization, verifyTokenAndAdmin };