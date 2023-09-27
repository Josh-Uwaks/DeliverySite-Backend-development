const express = require('express');
const UserRoute = require('./routes/userRoutes');
const ShipmentRoute = require('./routes/shipmentRoutes')
// const {limiter} = require('./middleware/loginLimiter')
const dotenv = require('dotenv');
const {connectDb} = require('./config/db')
const {notFound, errorHandler} = require('./middleware/errorMiddleware')
const CookieParser = require('cookie-parser')
const cors = require('cors')

dotenv.config();
const app = express();

const port = process.env.PORT || 5000

connectDb();

app.use((req, res, next) => {
    console.log(req.path, req.method)
    next();
});

app.use(express.json());
app.use(cors({origin: ['http://localhost:3000'], credentials: true}))
app.use(express.urlencoded({extended: true}));
app.use(CookieParser())
app.use("/api/v1/users", UserRoute);
app.use("/api/v1/shipments", ShipmentRoute)
app.use(notFound);
app.use(errorHandler);

app.listen(port, () => console.log(`Server started running at ${port}`))