import mongoose from "mongoose";
import 'dotenv/config'

try {
    await mongoose.connect(process.env.MONGO_CNN)
    console.log('Conectado a la DB🤙🤙')
} catch (error) {
    console.log('Error de conexion a mongo db😔:' + error)

}