import React from 'react';
import { Radio, Typography } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { setSelectedOption, selectBooleanSlice } from './slice';

const { Title } = Typography;

interface BooleanChoiceQuestionProps {
  question: string;
  options: string[];
  onAnswerSelected: (selectedAnswer: string) => void;
  type: string;
}

const BooleanChoiceQuestion: React.FC<BooleanChoiceQuestionProps> = ({
  question,
  options,
  onAnswerSelected,
  type,
}) => {
  const dispatch = useDispatch();
  const { selectedOption } = useSelector(selectBooleanSlice);

  const handleOptionChange = (e: any) => {
    const value = e.target.value;
    dispatch(setSelectedOption(value));
    onAnswerSelected(value);
  };

  return (
    <div>
      <p>Сложность - {type}</p>
      <Title level={3}>{question}</Title>

      <Radio.Group onChange={handleOptionChange} value={selectedOption}>
        {options.map((option, index) => (
          <Radio key={index} value={option}>
            {option}
          </Radio>
        ))}
      </Radio.Group>
    </div>
  );
};

export default BooleanChoiceQuestion;
