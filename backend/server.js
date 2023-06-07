const express = require('express');
const UserRoute = require('./routes/userRoutes');
const dotenv = require('dotenv');
const {notFound, errorHandler} = require('./middleware/errorMiddleware')
dotenv.config();
const app = express();
const port = process.env.PORT || 5000

app.use("/api/v1/users", UserRoute)

app.use(notFound);
app.use(errorHandler);

app.listen(port, () => console.log(`Server started running at ${port}`))