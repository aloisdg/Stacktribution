import { Attribution } from '../models/Attribution';
import { AppDefault } from '../utils/AppDefault';
import StackAnswer from './models/StackAnswer';
import StackQuestion from './models/StackQuestion';
import { fetchStack, mapQuestion, mapAnswer } from './Utils/StackUtils';

const fetchStackOverflowApi = async (
  answerId: string
): Promise<Attribution> => {
  if (answerId === '6176851') {
    return AppDefault;
  }

  // todo: we could support others website like e.g. codereview.
  const answerData = await fetchStack<StackAnswer>(`answers/${answerId}`);
  const questionData = await fetchStack<StackQuestion>(
    `questions/${answerData.question_id}`
  );

  return {
    question: mapQuestion(questionData),
    answer: mapAnswer(answerData),
  };
};

export default fetchStackOverflowApi;
