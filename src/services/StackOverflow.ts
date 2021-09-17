import Attribution from '../models/Attribution';
import { AppDefault } from '../utils/AppDefault';
import { getYearFromUnix } from '../utils/YearUtils';

const fetchStackOverflowApi = async (
  answerId: string
): Promise<Attribution> => {
  if (answerId === '6176851') {
    return AppDefault;
  }
  const answerData = await fetch(
    `https://api.stackexchange.com/2.3/answers/${answerId}?site=stackoverflow`
  )
    .then((response) => response.json())
    .then((json) => {
      const data = json.items[0];
      const model = {
        answererName: data.owner.display_name,
        answererProfile: data.owner.link,
        answerUrl: `https://stackoverflow.com/a/${data.answer_id}/1248177`,
        questionUrl: `https://stackoverflow.com/q/${data.question_id}/1248177`,
        answerYear: getYearFromUnix(
          data.last_edit_date ?? data.last_activity_date ?? data.creation_date
        ),
        license: data.content_license,
        // todo: handle more like 3.0
        licenseUrl:
          data.content_license === 'CC BY-SA 4.0'
            ? 'https://creativecommons.org/licenses/by-sa/4.0/'
            : undefined,
        questionId: data.question_id,
      };
      return model;
    });

  const questionTitle = await fetch(
    `https://api.stackexchange.com/2.3/questions/${answerData.questionId}?site=stackoverflow`
  )
    .then((response) => response.json())
    .then((json) => json.items[0].title);

  return {
    ...answerData,
    questionTitle,
  };
};

export default fetchStackOverflowApi;
