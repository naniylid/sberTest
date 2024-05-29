describe('template spec', () => {
  beforeEach(() => {
    const apiQuestions = [
      {
        question: 'Sample question',
        correct_answer: 'Correct answer',
        incorrect_answers: ['Incorrect answer 1', 'Incorrect answer 2'],
        type: 'multiple',
        difficulty: 'easy',
      },
    ];

    cy.request('GET', 'https://opentdb.com/api.php?amount=10&category=9', {
      statusCode: 200,
      body: {
        results: apiQuestions,
      },
    }).as('fetchQuestions');
  });

  it('passes', () => {
    cy.visit('http://localhost:5173/');

    cy.get('[data-testId="result-title"]')
      .should('exist')
      .should('have.text', 'Вы ответили на 0 из 0 🎉');
  });
});
