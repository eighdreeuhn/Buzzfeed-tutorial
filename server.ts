import express, { Request, Response } from 'express'
import axios,   { AxiosResponse }    from 'axios'
import { QuizData } from "./interfaces"

require('dotenv').config()
const app = express()
const TOKEN = process.env.TOKEN
const GETURL = process.env.GETURL
const PORT = 8000

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
            const quizItem: QuizData = await response.data.data["2e239229-7772-42df-a39f-e93d9252d150"]
            res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000")
            res.send(quizItem)
        }
    }
    catch (e) {
        console.log(`This happend: ${e}... and then this happened: ${e}... also this ${e}.`)
    }
})

app.listen(PORT, () => console.log(`Broadcasting... live and direct, on port: ${PORT}`))
