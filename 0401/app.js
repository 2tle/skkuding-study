import express from "express";
import bodyParser from "body-parser";
import restaurantRouter from "./routes/restaurant.js"

async function serverStart() {
    const app = express()
    app.use(bodyParser.json({
        limit : "50mb"
    }))
    app.use(bodyParser.urlencoded({ limit : "50mb",extended: true }))
    app.use((req, res, next) => {
        res.header('Access-Control-Allow-Origin', '*')
        res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH')
        res.header('Access-Control-Allow-Headers', 'content-type')
        next()
    })
    app.get('/', (req,res) => {
        return res.status(200).json({"msg": "Hello, World!"});
    })
    app.use('/restaurant',restaurantRouter)
    app.use((req,res,next) => {
        return res.status(404).json({
            "error": "Not Found"
        })
    })
    app.use((err, req, res, next) => {
        console.error(err)
        return res.status(500).json({
            "error": err
        })
    })
    app.listen(3000, () => {console.log("Server is listening at port 3000")});
}

serverStart()




