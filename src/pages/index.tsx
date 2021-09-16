import { useState } from 'react';

import { Meta } from '../layout/Meta';
import { Main } from '../templates/Main';
import { AppDefault } from '../utils/AppDefault';

enum DocType {
  'xmlDoc',
  'jsDoc',
}

/**
 * @author Gary Vernon Grubb <https://stackoverflow.com/users/2943174/gary-vernon-grubb>
 * @copyright 2018 Gary Vernon Grubb
 * @license CC BY-SA 4.0
 * @see {@link https://stackoverflow.com/a/52033479/1248177|In reactJS, how to copy text to clipboard?}
 */
const copy = (content: string) => {
  navigator.clipboard.writeText(content);
};

const getYearFromUnix = (unixDate: number) =>
  new Date(unixDate * 1000).getFullYear();

const buildXmlDoc = (model: any): string =>
  `/// <remarks>
/// Inspired from <a href="${model.answererProfile}">${model.answererName}</a>'s
/// <a href="${model.answerUrl}">answer</a> published under ${
    model.licenseUrl
      ? `<a href="${model.licenseUrl}">${model.license}`
      : model.license
  }</a>
/// on <a href="${model.questionUrl}">${model.questionTitle}</a>.
/// </remarks>`;

const buildJsDoc = (model: any): string =>
  `/**
* @author ${model.answererName} <${model.answererProfile}>
* @copyright ${model.answerYear} ${model.answererName}
* @license ${model.license}
* @see {@link ${model.answerUrl}|${model.questionTitle}}
*/`;

const fetchStackOverflowApi = async (answerId: string) => {
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
        questionTitle: undefined, // "How to validate a credit card number",
        answerYear: getYearFromUnix(
          data.last_edit_date ?? data.last_activity_date ?? data.creation_date
        ),
        license: data.content_license,
        licenseUrl:
          data.content_license === 'CC BY-SA 4.0'
            ? 'https://creativecommons.org/licenses/by-sa/4.0/'
            : null, // hopefully
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

const Index = () => {
  const [answerId, setAnswerId] = useState('6176851');
  const [xmlDoc, setXmlDoc] = useState(buildXmlDoc(AppDefault));
  const [jsDoc, setJsDoc] = useState(buildJsDoc(AppDefault));
  const [docType, setDocType] = useState(DocType.xmlDoc);

  const download = async () => {
    // todo: froze the button while fetching
    const data = await fetchStackOverflowApi(answerId);
    setXmlDoc(buildXmlDoc(data));
    setJsDoc(buildJsDoc(data));
  };

  // todo: add outline to elements
  return (
    <Main
      meta={
        <Meta
          title="Stacktribution"
          description="A tiny webapp to generate proper attribution to a Stack Overflow's answer."
        />
      }
    >
      <div className="shadow-md rounded-md flex flex-col">
        <div className="mb-3 flex items-end">
          <label htmlFor="answerIdInput" className="text-white w-full">
            Answer id or url:
            <input
              defaultValue="6176851"
              onChange={(e) => {
                // todo: addcode to extract from url
                setAnswerId(e.currentTarget.value);
              }}
              type="text"
              placeholder="6865024"
              className="px-2 py-1 text-white text-base placeholder-gray-400 relative bg-gray-800 rounded border border-gray-600 outline-none focus:outline-none focus:ring w-full"
            />
          </label>

          <button
            className="bg-yellow-500 ml-2 px-6 py-2 text-white active:bg-yellow-600 rounded shadow hover:shadow-md outline-none focus:outline-none ease-linear transition-all duration-150"
            type="button"
            onClick={download}
          >
            <div className="rotate-45 text-1xl -m-1">⚲</div>
          </button>
        </div>

        <label className="mb-3 text-white">
          Select your attribution&apos;s flavor:
          <select
            onChange={(e) =>
              setDocType(
                e.currentTarget.value === 'xmlDoc'
                  ? DocType.xmlDoc
                  : DocType.jsDoc
              )
            }
            className="block w-full text-gray-300 py-2 px-3 border border-gray-700 bg-gray-800 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"
          >
            <option>xmlDoc</option>
            <option>jsDoc</option>
          </select>
        </label>

        <pre className="overflow-x-auto bg-gray-900 text-yellow-400 p-4 mb-3 rounded">
          {docType === DocType.xmlDoc && <code>{xmlDoc}</code>}
          {docType === DocType.jsDoc && <code>{jsDoc}</code>}
        </pre>

        <button
          className="bg-yellow-500 text-white active:bg-yellow-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mb-3 ease-linear transition-all duration-150"
          type="button"
          onClick={() => copy(docType === DocType.xmlDoc ? xmlDoc : jsDoc)}
        >
          Copy
        </button>
      </div>
    </Main>
  );
};

export default Index;
