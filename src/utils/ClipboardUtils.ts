/**
 * @author Gary Vernon Grubb <https://stackoverflow.com/users/2943174/gary-vernon-grubb>
 * @copyright 2018 Gary Vernon Grubb
 * @license CC BY-SA 4.0
 * @see {@link https://stackoverflow.com/a/52033479/1248177|In reactJS, how to copy text to clipboard?}
 */
const copy = (content: string) => {
  navigator.clipboard.writeText(content);
};

export default copy;
