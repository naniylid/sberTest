import React from 'react';
import { Question } from '../redux/api/types';

type ResultProps = {
  correct: number;
  totalQuestions: number;
  questions: Question[];
  selectedAnswers: string[];
};

const Result: React.FC<ResultProps> = ({ correct, totalQuestions, questions, selectedAnswers }) => {
  const categorizedResults = {
    easy: questions.filter((item) => item.difficulty === 'easy'),
    medium: questions.filter((item) => item.difficulty === 'medium'),
    hard: questions.filter((item) => item.difficulty === 'hard'),
  };

  return (
    <div className='result'>
      <h2 data-testid='result-title'>
        Вы ответили на {correct} из {totalQuestions} &#127881;
      </h2>

      <div>
        <h3>Легкие вопросы:</h3>
        <ul>
          {categorizedResults.easy.map((item, index) => (
            <li key={index}>
              <p>
                <strong>Вопрос:</strong> {item.question}
              </p>
              <p>
                <strong>Ваш ответ:</strong> {selectedAnswers[index]}
              </p>
              <p>
                <strong>Правильный ответ:</strong> {item.correct_answer}
              </p>
            </li>
          ))}
        </ul>
      </div>

      <div>
        <h3>Средние вопросы:</h3>
        <ul>
          {categorizedResults.medium.map((item, index) => (
            <li key={index}>
              <p>
                <strong>Вопрос:</strong> {item.question}
              </p>
              <p>
                <strong>Ваш ответ:</strong>{' '}
                {selectedAnswers[index + categorizedResults.easy.length]}
              </p>
              <p>
                <strong>Правильный ответ:</strong> {item.correct_answer}
              </p>
            </li>
          ))}
        </ul>
      </div>

      <div>
        <h3>Сложные вопросы:</h3>
        <ul>
          {categorizedResults.hard.map((item, index) => (
            <li key={index}>
              <p>
                <strong>Вопрос:</strong> {item.question}
              </p>
              <p>
                <strong>Ваш ответ:</strong>{' '}
                {
                  selectedAnswers[
                    index + categorizedResults.easy.length + categorizedResults.medium.length
                  ]
                }
              </p>
              <p>
                <strong>Правильный ответ:</strong> {item.correct_answer}
              </p>
            </li>
          ))}
        </ul>
      </div>
      <a href='/'>
        <button>Попробовать снова</button>
      </a>
    </div>
  );
};

export default Result;
