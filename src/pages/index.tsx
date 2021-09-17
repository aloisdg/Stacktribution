import { useMachine } from '@xstate/react';

import { Main } from '../layout/Main';
import { Meta } from '../layout/Meta';
import DocType from '../models/DocType';
import FetchContext from '../models/FetchContext';
import extractId from '../utils/IdUtils';
import { FetchMachine } from '../utils/StateMachine';

const Index = () => {
  const [current, send] = useMachine(FetchMachine);
  const { jsDoc, xmlDoc, docType } = current.context as FetchContext;

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
                const trimmed = e.currentTarget.value.trim();
                if (!trimmed) return;
                const id = extractId(trimmed);
                if (id) send('UPDATEID', { value: id });
              }}
              type="text"
              placeholder="6865024"
              className="px-2 py-1 text-white text-base placeholder-gray-400 relative bg-gray-800 rounded border border-gray-600 outline-none focus:outline-none focus:ring w-full"
            />
          </label>

          <button
            className="bg-yellow-500 ml-2 px-6 py-2 text-white active:bg-yellow-600 rounded shadow hover:shadow-md outline-none focus:outline-none ease-linear transition-all duration-150"
            type="button"
            disabled={current.matches('loading')}
            onClick={() => send('FETCH')}
          >
            <div className="rotate-45 text-1xl -m-1">⚲</div>
          </button>
        </div>

        <label className="mb-3 text-white">
          Select your attribution&apos;s flavor:
          <select
            onChange={(e) =>
              send('UPDATEDOCTYPE', {
                value:
                  e.currentTarget.value === 'xmlDoc'
                    ? DocType.xmlDoc
                    : DocType.jsDoc,
              })
            }
            className="block w-full text-gray-300 py-2 px-3 border border-gray-700 bg-gray-800 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"
          >
            <option>jsDoc</option>
            <option>xmlDoc</option>
          </select>
        </label>

        <pre className="overflow-x-auto bg-gray-900 text-yellow-400 p-4 mb-3 rounded">
          {docType === DocType.xmlDoc && <code>{xmlDoc}</code>}
          {docType === DocType.jsDoc && <code>{jsDoc}</code>}
        </pre>

        <button
          className="bg-yellow-500 text-white active:bg-yellow-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mb-3 ease-linear transition-all duration-150"
          type="button"
          onClick={() => send('COPY')}
        >
          Copy
        </button>
      </div>
    </Main>
  );
};

export default Index;
