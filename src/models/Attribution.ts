type Author = {
  // e.g. aloisdg
  name: string;
  // e.g. https://stackoverflow.com/users/1248177/aloisdg
  link: string;
};

type Post = {
  // e.g. https://stackoverflow.com/a/59643485/1248177
  link: string;
  // 2020
  year: number;
  author: Author;
};

export type Question = Post & {
  // e.g. Prepend to a C# Array
  title: string;
};

export type Answer = Post & {
  // e.g. CC BY-SA 4.0
  license: string;
  // e.g. https://creativecommons.org/licenses/by-sa/4.0/
  licenseLink?: string;
};

export type Attribution = {
  question: Question;
  answer: Answer;
};
