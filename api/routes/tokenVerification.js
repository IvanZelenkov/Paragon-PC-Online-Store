const JWT = require('jsonwebtoken');

const tokenVerification = (request, response, next) => {
    const authenticationHeader = request.headers.token;

    if (authenticationHeader) {
        const token = authenticationHeader.split(" ")[1];
        JWT.verify(token, 4994741, (error, user) => {
            if (error) 
                response.status(403).json("Token is not valid!");

            request.user = user;
            next();
        });
    } else {
        return response.status(401).json("You are not authenticated!");
    }
}

const verifyTokenAndAuthorization = (request, response, next) => {
    tokenVerification(request, response, () => {
        if (request.user.id === request.params.id || request.user.isAdmin)
            next();
        else
            response.status(403).json("You are not allowed to do that!");
    });
};

const verifyTokenAndAdmin = (request, response, next) => {
    tokenVerification(request, response, () => {
        if (request.user.isAdmin)
            next();
        else
            response.status(403).json("You are not allowed to do that!");
    });
};

module.exports = { tokenVerification, verifyTokenAndAuthorization, verifyTokenAndAdmin };