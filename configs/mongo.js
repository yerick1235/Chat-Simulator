import mongoose from "mongoose"

export const connect = async()=>{
    try {
        mongoose.connection.on('error', () => {
            console.log('MongoDB | Could not be connected to mongodb')
            mongoose.disconnect()
        })
        mongoose.connection.on('connecting', () => console.log('MongoDB | try connecting'))
        mongoose.connection.on('connected', () => console.log('MongoDB | connected to mongodb'))
        mongoose.connection.on('open', () => console.log('MongoDB | connected to database'))
        mongoose.connection.on('disconnected', () => console.log('MongoDB | disconnected'))
        mongoose.connection.on('reconnected', () => console.log('MongoDB | reconnected to mongodb'))
        await mongoose.connect(process.env.URIMongo)
    } catch (err) {
        console.error('DB Connectio0n failed', err)
    }
}