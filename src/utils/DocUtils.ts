import Attribution from '../models/Attribution';

export const buildXmlDoc = (model: Attribution): string =>
  `/// <remarks>
/// Inspired from <a href="${model.answererProfile}">${model.answererName}</a>'s
/// <a href="${model.answerUrl}">answer</a> published under ${
    model.licenseUrl
      ? `<a href="${model.licenseUrl}">${model.license}`
      : model.license
  }</a>
/// on <a href="${model.questionUrl}">${model.questionTitle}</a>.
/// </remarks>`;

export const buildJsDoc = (model: Attribution): string =>
  `/**
* @author ${model.answererName} <${model.answererProfile}>
* @copyright ${model.answerYear} ${model.answererName}
* @license ${model.license}
* @see {@link ${model.answerUrl}|${model.questionTitle}}
*/`;
