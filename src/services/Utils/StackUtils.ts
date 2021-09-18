import { Answer, Question } from '../../models/Attribution';
import StackAnswer from '../models/StackAnswer';
import StackQuestion from '../models/StackQuestion';

// todo:
// SO like to know who send you there.
// We can fallback to 1248177, but
// I would prefer to extract the userId from the url whenever possible.
// to achieve that, we can edit the grouping of the regex
// or even add an input in the ui.
const AloisdgId = '1248177';

export const getYearFromUnix = (unixDate: number) =>
  new Date(unixDate * 1000).getFullYear();

const getLicenseLink = (license: string) => {
  switch (license) {
    case 'CC BY-SA 3.0':
      return 'https://creativecommons.org/licenses/by-sa/3.0/';
    case 'CC BY-SA 4.0':
      return 'https://creativecommons.org/licenses/by-sa/4.0/';
    default:
      return undefined;
  }
};

export const mapAnswer = (item: StackAnswer): Answer => ({
  author: {
    name: item.owner.display_name,
    link: item.owner.link,
  },
  link: `https://stackoverflow.com/a/${item.answer_id}/${AloisdgId}`,
  year: getYearFromUnix(
    item.last_edit_date ?? item.last_activity_date ?? item.creation_date
  ),
  license: item.content_license,
  licenseLink: getLicenseLink(item.content_license),
});

export const mapQuestion = (item: StackQuestion): Question => ({
  author: {
    name: item.owner.display_name,
    link: item.owner.link,
  },
  link: `https://stackoverflow.com/q/${item.question_id}/${AloisdgId}`,
  year: getYearFromUnix(
    item.last_edit_date ?? item.last_activity_date ?? item.creation_date
  ),
  title: item.title,
});

// todo: handle errors i.e json.iems is empty
export const fetchStack = async <T>(fragment: string): Promise<T> =>
  fetch(`https://api.stackexchange.com/2.3/${fragment}?site=stackoverflow`)
    .then((response) => response.json())
    .then((json) => json.items[0]);
