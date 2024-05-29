export type Question = {
  type: string;
  difficulty: string;
  question: string;
  correct_answer: string;
  incorrect_answers: string[];
};

export type Questions = {
  results: Question[];
};

export enum Status {
  LOADING = 'loading',
  SUCCESS = 'success',
  ERROR = 'error',
}

export interface ApiSliceState {
  items: Question[];
  status: Status;
}
