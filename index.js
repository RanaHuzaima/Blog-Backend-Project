import express from "express";
import path from "path"
import connectDB from "./db/index.js"
import cookieParser from "cookie-parser";
import { checkForAuthenticationByCookie } from "./middlewares/authentication.js";
import { Blog } from "./models/blog.model.js";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime.js";
import 'dotenv/config'
dayjs.extend(relativeTime);

const app = express();
const port = process.env.PORT || 3001

app.use(cookieParser())
app.set("view engine", "ejs")
app.set("views", path.resolve("./views"))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(checkForAuthenticationByCookie("token"))
app.use(express.static(path.resolve("./public")))

// Pass dayjs to your EJS templates
app.use((req, res, next) => {
    res.locals.dayjs = dayjs;
    next();
});


// connect Database
connectDB().then(() => {
    app.listen(port, () => {
        console.log(`server is started at ${port}`);
    })
}).catch((error) => {
    console.log("error while connect to DB:", error);
})

// import routes
import userRouter from "./routes/user.route.js";
import blogRouter from "./routes/blog.route.js";


// route declar
app.use("/user", userRouter)
app.use("/blog", blogRouter)

app.get("/", async function (req, res) {
    const allBlog = await Blog.find({})
    res.render("home", {
        user: req.user,
        blogs: allBlog
    })
})
