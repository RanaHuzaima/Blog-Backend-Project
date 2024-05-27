import jwt from "jsonwebtoken";

const secret = "uLw}6u9bNpy=GLuhg8.(A}$pr$!znQ"

const createTokenForUser = (user) => {
    const payload = {
        _id: user._id,
        email: user.email,
        fullName: user.fullName,
        profileImageURL: user.profileImageURL,
        role: user.role
    }

    const token = jwt.sign(payload, secret)
    return token
}

const validateToken = (token) => {
    const payload =  jwt.verify(token, secret)
    return payload
}

export {
    createTokenForUser,
    validateToken
}