import { describe, it, vi } from 'vitest';
import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '../../utils/test-utils';
import MultipleChoiceQuestion from './MultipleChoiceQuestion';

const mockProps = {
  question: 'What are your favorite programming languages?',
  options: ['JavaScript', 'Python', 'Java', 'TypeScript'],
  onAnswerSelected: vi.fn(),
  type: 'medium',
};

describe('MultipleChoiceQuestion component', () => {
  it('правильно отображает вопрос и варианты', () => {
    render(<MultipleChoiceQuestion {...mockProps} />);

    const questionElement = screen.getByText('What are your favorite programming languages?');
    expect(questionElement).toBeInTheDocument();

    const jsOption = screen.getByLabelText('JavaScript');
    const pythonOption = screen.getByLabelText('Python');
    expect(jsOption).toBeInTheDocument();
    expect(pythonOption).toBeInTheDocument();
  });

  it('выбирает параметры и запускает обратный вызов при отправке', async () => {
    render(<MultipleChoiceQuestion {...mockProps} />);

    const javaOption = screen.getByLabelText('Java');
    const tsOption = screen.getByLabelText('TypeScript');
    fireEvent.click(javaOption);
    fireEvent.click(tsOption);

    const submitButton = screen.getByText('Далее');
    fireEvent.click(submitButton);

    expect(mockProps.onAnswerSelected).toHaveBeenCalled();
  });
});
