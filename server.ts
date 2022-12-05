import express, {Request,Response} from 'express'
import axios,   {AxiosResponse}    from 'axios'
import {QuizData} from "./interfaces"

require('dotenv').config()
const PORT = 8000
const TOKEN = process.env.TOKEN
const GETURL = process.env.GETURL
const app = express()

app.get("/quiz-item", async (req: Request, res: Response) => {
    try {
        //@ts-ignore
        const response : AxiosResponse = await axios.get(GETURL,
        {
            headers: {
                "X-Cassandra-Token": TOKEN,
                "accept-encoding": "application/json"
            }
        })
        if (response.status === 200) {
            const quizItem: QuizData = await response.data.data["1f5975b0-e83d-4c69-b94e-a0a0b0b4926d"]
            res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000")
            res.send(quizItem)
        }
    }
    catch (e) {
        console.log(`This happend: ${e} and then this happened: ${e} also this ${e}`)
    }
})

app.listen(PORT, () => console.log(`Server running on port: ${PORT}`))
