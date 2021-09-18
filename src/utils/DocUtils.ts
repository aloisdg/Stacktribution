import { Attribution } from '../models/Attribution';

// Attribution — You must attribute the work in the manner specified by the author or licensor (but not in any way that suggests that they endorse you or your use of the work).
// https://stackoverflow.blog/2009/06/25/attribution-required/

// So let me clarify what Stack Overflow means by attribution. If you republish a content, they require that you:
// 1. Visually indicate that the content is from Stack Overflow or the Stack Exchange network in some way. It doesn’t have to be obnoxious; a discreet text blurb is fine.
// 2. Hyperlink directly to the original question on the source site (e.g., http://stackoverflow.com/questions/12345)
// 3. Show the author names for every question and answer
// 4. Hyperlink each author name directly back to their user profile page on the source site (e.g., http://stackoverflow.com/users/12345/username)

export const buildXmlDoc = (model: Attribution): string => {
  const license = model.answer.licenseLink
    ? `<a href="${model.answer.licenseLink}">${model.answer.license}`
    : model.answer.license;
  return `/// <remarks>
/// Inspired from <a href="${model.answer.author.link}">${model.answer.author.name}</a>'s
/// <a href="${model.answer.link}">answer</a> published on Stack Overflow under ${license}</a>
/// on <a href="${model.question.link}">${model.question.title}</a> by <a href="${model.question.author.link}">${model.question.author.name}</a>.
/// </remarks>`;
};

// https://meta.stackexchange.com/questions/126414/what-is-the-correct-way-to-attribute-a-stack-overflow-answer-in-my-code
export const buildAdjamDoc = (model: Attribution): string => {
  return `// Code created with the help of a Stack Overflow question
// ${model.question.title} <${model.question.link}>
// Question by ${model.question.link} <${model.question.author.link}>
// Answer by ${model.answer.author.name} <${model.answer.author.link}>
`;
};

export const buildJsDoc = (model: Attribution): string =>
  `/**
* @author ${model.answer.author.name} <${model.answer.author.link}>
* @copyright ${model.answer.year} ${model.answer.author.name}
* @license ${model.answer.license}
* @see {@link ${model.answer.link}|${model.question.title}}
*/`;
