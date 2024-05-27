import { Schema, model } from "mongoose";
import { createHmac, randomBytes } from "crypto"
import { createTokenForUser } from "../utils/authentication.js"

const userSchema = new Schema({
    fullName: {
        type: String,
        required: [true, "Fullname is required"]
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        unique: true,
    },
    password: {
        type: String,
        required: [true, "Password is required"]
    },
    salt: {
        type: String,
    },
    profileImageURL: {
        type: String,
        default: "/images/user_img.png"
    },
    role: {
        type: String,
        enum: ["USER", "ADMIN"],
        default: "USER"
    }
}, { timestamps: true })

userSchema.pre("save", function () {
    const user = this;

    if (!user.isModified("password")) return;

    const salt = randomBytes(16).toString("base64");
    const hashPaword = createHmac("sha256", salt).update(user.password).digest("hex")

    this.salt = salt
    this.password = hashPaword
})

userSchema.static("matchPasswordorGenerateToken", async function (email, password) {
    const user = await this.findOne({ email })

    if (!user) throw new Error("User is not found")

    const salt = user.salt
    const userHashedPassword = user.password

    const userProvidedPaword = createHmac("sha256", salt).update(password).digest("hex")

    if (userProvidedPaword !== userHashedPassword) throw new Error("password is not matched")

    // Convert user document to plain object and remove password and salt
    const userObject = user.toObject();
    delete userObject.password;
    delete userObject.salt;

    const token = createTokenForUser(userObject)

    return token;

})

export const User = model("User", userSchema)