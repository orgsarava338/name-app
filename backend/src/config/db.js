const mongoose =  require("mongoose");

exports.connectToDatabase = async () => {
    try {
        const db = await mongoose.connect(process.env.MONGO_DB_URL);
        console.log(`MongoDB connected at ${db.connection.host} ${db.connection.name}`);
    } catch(error) {
        console.error(`Mongo DB Connection Error : ${error.message}`, error);
        process.exit(1);
    }
}