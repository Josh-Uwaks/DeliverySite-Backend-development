const express = require('express');
const UserRoute = require('./routes/userRoutes');
const dotenv = require('dotenv');
const {connectDb} = require('./config/db')
const {notFound, errorHandler} = require('./middleware/errorMiddleware')
dotenv.config();
const app = express();

const port = process.env.PORT || 5000

connectDb()

app.use((req, res, next) => {
    console.log(req.path, req.method)
    next()
})

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use("/api/v1/users", UserRoute)
app.use(notFound);
app.use(errorHandler);


app.listen(port, () => console.log(`Server started running at ${port}`))