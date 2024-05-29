import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Progress, Typography } from 'antd';
import './Test.scss';

import Result from '../Result';
import MultipleChoiceQuestion from '../Multiple/MultipleChoiceQuestion';
import BooleanChoiceQuestion from '../Boolean/BooleanChoiceQuestion';

import { setStep, setCorrect, setQuestions, selectTestSlice, setSelectedAnswers } from './slice';
import { Question } from '../../redux/api/types';
import { fetchQuestions, selectApiSlice } from '../../redux/api/slice';
import { useAppDispatch } from '../../redux/store';

const { Title } = Typography;

const Test: React.FC = () => {
  const dispatch = useAppDispatch();
  const { step, correct, questions, selectedAnswers } = useSelector(selectTestSlice);
  const { items: apiQuestions, status } = useSelector(selectApiSlice);

  useEffect(() => {
    dispatch(fetchQuestions());
  }, [dispatch]);

  useEffect(() => {
    if (status === 'success') {
      dispatch(setQuestions(apiQuestions));
    }
  }, [status, apiQuestions, dispatch]);

  const onClickVariant = (selectedAnswer: string | string[], question: Question) => {
    dispatch(setStep(step + 1));

    if (Array.isArray(selectedAnswer)) {
      const sortedSelected = [...selectedAnswer].sort();
      const sortedCorrect = [...question.correct_answer].sort();

      const isCorrect = sortedSelected.join(',') === sortedCorrect.join(',');

      if (isCorrect) {
        dispatch(setCorrect(correct + 1));
      }
    } else {
      if (selectedAnswer === question.correct_answer) {
        dispatch(setCorrect(correct + 1));
      }
    }

    // Сохраняем выбранный ответ
    dispatch(setSelectedAnswers([...selectedAnswers, selectedAnswer.toString()]));
  };

  const progressPercent = ((step + 1) / questions.length) * 100;

  if (step < questions.length) {
    const currentQuestion = questions[step];
    return (
      <div data-testid='test-container' className='test-container'>
        <div className='test'>
          <Progress percent={progressPercent} />
          <Title level={1} data-testid='cypress-title'>
            Тестирование
          </Title>
          {currentQuestion.type === 'multiple' ? (
            <MultipleChoiceQuestion
              question={currentQuestion.question}
              options={[...currentQuestion.incorrect_answers, currentQuestion.correct_answer]}
              onAnswerSelected={(selectedAnswer) => onClickVariant(selectedAnswer, currentQuestion)}
              type={currentQuestion.difficulty}
            />
          ) : (
            <BooleanChoiceQuestion
              question={currentQuestion.question}
              options={[currentQuestion.correct_answer, ...currentQuestion.incorrect_answers]}
              onAnswerSelected={(selectedAnswer) => onClickVariant(selectedAnswer, currentQuestion)}
              type={currentQuestion.difficulty}
            />
          )}
        </div>
      </div>
    );
  } else {
    return (
      <div data-testid='test-container' className='test-container'>
        <div className='test'>
          <Result
            correct={correct}
            totalQuestions={questions.length}
            questions={questions}
            selectedAnswers={selectedAnswers}
          />
        </div>
      </div>
    );
  }
};

export default Test;
