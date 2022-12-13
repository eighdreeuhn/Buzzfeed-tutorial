import React, { useState, useEffect, useRef, createRef } from 'react'
import Title from './Components/Title'
import { QuizData, Content } from '../interfaces'
import QuestionsBlock from './Components/QuestionsBlock'
import AnswerBlock from './Components/AnswerBlock'

function App () {
  const [quiz, setQuiz] = useState<QuizData | null>()
  const [chosenAnswerItems, setChosenAnswerItems] = useState<string[]>([])
  const [unansweredQuestionIds, setUnansweredQuestionIds] = useState<number[]|undefined>([])
  const [showAnswer ,setShowAnswer] = useState<boolean>(false)

  type ReduceType = {
    id?:{}
  }

  // const refs = unansweredQuestionIds?.reduce<ReduceType | any>((acc,id) => acc[id] = createRef<HTMLDivElement | null>())

  console.log(chosenAnswerItems)

  const fetchData = async () => {
    try {
      const response = await fetch('http://localhost:8000/quiz-item')
      const json     = await response.json()
      setQuiz(json)
    } catch (e) {
      console.error(e)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  useEffect(()=> {
    const unansweredIds = quiz?.content.map(({id}: Content) => id)
    setUnansweredQuestionIds(unansweredIds)
  },[quiz])

  console.log(unansweredQuestionIds)

  useEffect(() => {
    if (unansweredQuestionIds) {
      if (unansweredQuestionIds.length <= 0 && chosenAnswerItems.length >= 1) {
        console.log(chosenAnswerItems)
        setShowAnswer(true)
        const answerBlock = document.getElementById('answer-block')
        answerBlock?.scrollIntoView({behavior: 'auto'})
      }
      const highestId = Math.min(...unansweredQuestionIds)
      const highestElement = document.getElementById(String(highestId))
      highestElement?.scrollIntoView({behavior: 'smooth'})
    }
  }, [unansweredQuestionIds, chosenAnswerItems])

  return (
    <div className="app">
      <Title title={quiz?.title} subtitle={quiz?.subtitle}/>
      {quiz?.content.map((content: Content, id: Content["id"]) => 
      <QuestionsBlock
      key={id}
      chosenAnswerItems={chosenAnswerItems}
      setChosenAnswerItems={setChosenAnswerItems}
      setUnansweredQuestionIds={setUnansweredQuestionIds}
      unansweredQuestionIds={unansweredQuestionIds}
      quizItem={content}
      />)}
      {showAnswer && <AnswerBlock answerOptions={quiz?.answers} chosenAnswers={chosenAnswerItems}/>}
    </div>
  )
}

export default App
