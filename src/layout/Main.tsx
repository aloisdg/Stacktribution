import { ReactNode } from 'react';

import { AppConfig } from '../utils/AppConfig';

type IMainProps = {
  meta: ReactNode;
  children: ReactNode;
};

const Main = (props: IMainProps) => (
  <div className="antialiased w-full text-gray-700">
    {props.meta}

    <div className="max-w-screen-md mx-2 sm:mx-4 md:mx-auto">
      <header className="border-b border-gray-700">
        <div className="pt-16 pb-8">
          <h1 className="font-bold text-3xl text-white">{AppConfig.title}</h1>
          <h2 className="text-xl text-white">{AppConfig.description}</h2>
        </div>
      </header>

      <div className="py-5 text-xl content">{props.children}</div>

      <footer className="border-t border-gray-700 text-center py-8 text-sm text-white">
        © Copyright {new Date().getFullYear()} {AppConfig.title}. Powered with{' '}
        <span role="img" aria-label="Love">
          ♥
        </span>{' '}
        by <a href="https://aloisdg.netlify.app">aloisdg</a>
      </footer>
    </div>
  </div>
);

export { Main };
