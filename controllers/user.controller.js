import { User } from "../models/user.model.js"

const handleUserSignin = (req, res) => {
    return res.render("signin")
}

const handleUserSignUp = (req, res) => {
    return res.render("signup")
}

const handleCreateUser = async (req, res) => {
    const { fullName, email, password } = req.body
    await User.create({
        fullName,
        email,
        password
    })

    return res.redirect("/")
}

const handleLoggingUser = async (req, res) => {
    const { email, password } = req.body
    try {
        const token = await User.matchPasswordorGenerateToken(email, password)
        return res.cookie("token", token).redirect("/")
    } catch (error) {
        return res.render("signin", {
            error: "Incorrect Email or Password"
        })
    }
}

const handleLogoutUser = (req, res) => {
    return res.clearCookie("token").redirect("/")
}

export {
    handleUserSignin,
    handleUserSignUp,
    handleCreateUser,
    handleLoggingUser,
    handleLogoutUser
}