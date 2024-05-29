import React from 'react';
import { Button, Checkbox, Typography } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { setSelectedOptions, selectMultipleSlice } from './slice';

const { Title } = Typography;

interface MultipleChoiceQuestionProps {
  question: string;
  options: string[];
  onAnswerSelected: (selectedAnswers: string[]) => void;
  type: string;
}

const MultipleChoiceQuestion: React.FC<MultipleChoiceQuestionProps> = ({
  question,
  options,
  onAnswerSelected,
  type,
}) => {
  const dispatch = useDispatch();
  const { selectedOptions } = useSelector(selectMultipleSlice);

  const handleOptionChange = (checkedValues: string[]) => {
    dispatch(setSelectedOptions(checkedValues));
  };

  const handleSubmit = () => {
    onAnswerSelected(selectedOptions);
  };

  return (
    <div>
      <p>Сложность - {type}</p>
      <Title level={3}>{question}</Title>

      <Checkbox.Group options={options} value={selectedOptions} onChange={handleOptionChange} />
      <Button onClick={handleSubmit} disabled={selectedOptions.length === 0}>
        Далее
      </Button>
    </div>
  );
};

export default MultipleChoiceQuestion;
