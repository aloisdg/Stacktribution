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
      <div className="border-b border-gray-700">
        <div className="pt-16 pb-8">
          <div className="font-bold text-3xl text-white">{AppConfig.title}</div>
          <div className="text-xl text-white">{AppConfig.description}</div>
        </div>
      </div>

      <div className="py-5 text-xl content">{props.children}</div>

      <div className="border-t border-gray-700 text-center py-8 text-sm text-white">
        © Copyright {new Date().getFullYear()} {AppConfig.title}. Powered with{' '}
        <span role="img" aria-label="Love">
          ♥
        </span>{' '}
        by <a href="https://aloisdg.netlify.app">aloisdg</a>
      </div>
    </div>
  </div>
);

export { Main };
