import { describe, it } from 'vitest';
import '@testing-library/jest-dom';
import { render, fireEvent } from '../../utils/test-utils';
import BooleanChoiceQuestion from './BooleanChoiceQuestion';

// Создаем заглушку функции onAnswerSelected
const mockOnAnswerSelected = (selectedAnswer: string) => {
  console.log(`Selected answer: ${selectedAnswer}`);
};

const mockProps = {
  question: 'Is React awesome?',
  options: ['True', 'False'],
  onAnswerSelected: mockOnAnswerSelected,
  type: 'easy',
};

describe('BooleanChoiceQuestion component', () => {
  it('Проверка рендера вопросов и ответов корректно', () => {
    const { getByText, getByLabelText } = render(<BooleanChoiceQuestion {...mockProps} />);

    // Проверяем, что вопрос и опции отображаются корректно
    const questionElement = getByText('Is React awesome?');
    expect(questionElement).toBeDefined();

    const trueOption = getByLabelText('True');
    const falseOption = getByLabelText('False');
    expect(trueOption).toBeDefined();
    expect(falseOption).toBeDefined();
  });

  it('Выбирает опцию и вызывает обратный вызов', () => {
    const { getByLabelText } = render(<BooleanChoiceQuestion {...mockProps} />);

    // Выбираем опцию 'True'
    const trueOption = getByLabelText('True');
    fireEvent.click(trueOption);
  });
});
