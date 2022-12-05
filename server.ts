import express, {Request,Response} from 'express'
import axios, {AxiosResponse} from 'axios'

const PORT = 8000
const app = express()

app.get("/quiz-item", async (req: Request, res: Response) => {
    try {
        const response : AxiosResponse = await axios.get("https://8cfd2eae-5bb1-4fdc-907b-a6166918e3a3-us-east1.apps.astra.datastax.com/api/rest/v2/namespaces/quizzes/collections/quirky",
        {
            headers: {
                "X-Cassandra-Token": "AstraCS:SKANtZYZjBdQHjsCUkZhRSHe:f61184ba2eb3b8549a5ac660233fd6b62453f80fae0353723cc9e07a46df0d0a",
                "accept-encoding": "application/json"
            }
        })
        if (response.status === 200) {
            const quizItem = await response.data
            res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000")
            res.send(quizItem)
        }
    }
    catch (e) {
        console.log(`This happend: ${e} and then this happened: ${e} also this ${e}`)
    }
})

app.listen(PORT, () => console.log(`Server running on port: ${PORT}`))