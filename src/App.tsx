import React, { useState, useEffect } from 'react'
import Title from './Components/Title'
import { QuizData, Content } from '../interfaces'
import QuestionsBlock from './Components/QuestionsBlock'

function App () {
  const [quiz, setQuiz] = useState<QuizData | null>()

  const fetchData = async () => {
    try {
      const response = await fetch('http://localhost:8000/quiz-item')
      const json = await response.json()
      setQuiz(json)
    } catch (e) {
      console.error(e)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  return (
    <div className="app">
      <Title title={quiz?.title} subtitle={quiz?.subtitle}/>
      {quiz?.content.map((content: Content, id: Content["id"]) => <QuestionsBlock key={id} quizItem={content} />)}
    </div>
  )
}

export default App
