const mongoose = require('mongoose')

const connectDb = async () => {
    try{
        const conn = await mongoose.connect(`mongodb+srv://${process.env.MONGODB_User}:${process.env.MONGODB_Pass}@cluster0.8nzsml3.mongodb.net/mernauth?retryWrites=true&w=majority`)
        console.log(`mongodb Connected: ${conn.connection.host}`)
    }catch(error){
        console.error(`Error: ${error.message}`);
        process.exit(1)
    }
}

module.exports = {connectDb}