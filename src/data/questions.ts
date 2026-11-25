import { Question } from '../types/assessment';
import { POLYNOMIAL_QUESTIONS } from './questionsPolynomial';
import { TRIGONOMETRY_PG_QUESTIONS } from './questionsTrigonometry';
import { ESSAY_QUESTIONS } from './questionsEssay';

export const ALL_QUESTIONS: Question[] = [
  ...POLYNOMIAL_QUESTIONS,
  ...TRIGONOMETRY_PG_QUESTIONS,
  ...ESSAY_QUESTIONS,
];
