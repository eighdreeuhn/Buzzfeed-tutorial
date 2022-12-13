import react from 'react'
import { Content, Question } from '../../interfaces'
import QuestionBlock from './QuestionBlock'

const QuestionsBlock = (
    {
         quizItem,
         chosenAnswerItems,
         setChosenAnswerItems,
         setUnansweredQuestionIds,
         unansweredQuestionIds
    }: 
    {
        quizItem: Content,
        chosenAnswerItems: string[],
        setChosenAnswerItems: Function,
        setUnansweredQuestionIds: Function,
        unansweredQuestionIds: number[]|undefined
        }) => {
    console.log(quizItem)
    return (
        <div>
        <h2 className="title-block" id={String(quizItem.id)}>{quizItem.title}</h2>
        <div className="questions-container">
            {quizItem?.questions.map((question: Question, _index: number) => (
                <QuestionBlock 
                    key={_index}
                    question={question}
                    chosenAnswerItems={chosenAnswerItems}
                    setChosenAnswerItems={setChosenAnswerItems}
                    quizItemId={quizItem.id}
                    setUnansweredQuestionIds={setUnansweredQuestionIds}
                    unansweredQuestionIds={unansweredQuestionIds}
                />
            ))}
        </div>
        </div>
    )
}

export default QuestionsBlock
