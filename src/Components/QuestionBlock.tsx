import react from 'react'
import { Question } from '../../interfaces'

const QuestionBlock = (
    {
        question, 
        quizItemId,
        chosenAnswerItems,
        setChosenAnswerItems, 
        setUnansweredQuestionIds,
        unansweredQuestionIds
    }: 
    {
        question: Question, 
        chosenAnswerItems: string[],
        setChosenAnswerItems: Function,
        setUnansweredQuestionIds: Function,
        unansweredQuestionIds: number[]|undefined,
        quizItemId: number
    }) => {

    const handleClick = () => {
        setChosenAnswerItems((prevState:string[]) => [...prevState, question.text])
        setUnansweredQuestionIds(unansweredQuestionIds?.filter((id: number)=> (id!==quizItemId)))
    }

    const validPick = !chosenAnswerItems?.includes(question.text) && !unansweredQuestionIds?.includes(quizItemId)

    return (
        <button
            className="question-block"
            onClick={handleClick}
        >
            <img src={question.image} alt={question.alt}/>
            <h3>{question.text}</h3>
            <p>
                <a href={question.image}>{question.credit}</a>
                <a href="https://www.unsplash.com">Unsplash</a>
            </p>
        </button>
    )
}

export default QuestionBlock 