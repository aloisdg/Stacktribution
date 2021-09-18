import { useMachine } from '@xstate/react';

import { Main } from '../layout/Main';
import { Meta } from '../layout/Meta';
import DocType from '../models/DocType';
import FetchContext from '../models/FetchContext';
import extractId from '../utils/IdUtils';
import { FetchMachine } from '../utils/StateMachine';

const mapDocType = (value: string): DocType => {
  switch (value) {
    case 'xmlDoc':
      return DocType.xmlDoc;
    case 'jsDoc':
      return DocType.jsDoc;
    case 'adjamDoc':
      return DocType.adjamDoc;
    default:
      // eslint-disable-next-line no-console
      console.error(`docType not implemented`);
      return DocType.jsDoc;
  }
};

const Index = () => {
  const [current, send] = useMachine(FetchMachine);
  const { jsDoc, xmlDoc, adjamDoc, docType } = current.context as FetchContext;

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
            Add an answer id or url:
            <div className="flex">
              <input
                id="answerIdInput"
                defaultValue="6176851"
                onChange={(e) => {
                  const trimmed = e.currentTarget.value.trim();
                  if (!trimmed) return;
                  const id = extractId(trimmed);
                  if (id) send('UPDATEID', { value: id });
                }}
                type="text"
                placeholder="e.g. 6865024 or https://stackoverflow.com/a/61546346/1248177"
                className="w-full bg-gray-800 placeholder-gray-600 rounded border border-gray-700 focus:border-yellow-500 focus:ring-2 focus:ring-yellow-800 text-base outline-none text-gray-300 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
              />

              <button
                className="ml-2 bg-yellow-600 border-0 py-2 px-6 hover:bg-yellow-500 rounded text-lg outline-none focus:outline-none focus:border-yellow-500 focus:ring-2 focus:ring-yellow-800"
                type="button"
                disabled={current.matches('loading')}
                onClick={() => send('FETCH')}
              >
                <div className="rotate-45 text-xl -m-1">⚲</div>
              </button>
            </div>
          </label>
        </div>

        <label className="mb-3 text-white">
          Select a flavor:
          <select
            onChange={(e) =>
              send('UPDATEDOCTYPE', {
                value: mapDocType(e.currentTarget.value),
              })
            }
            className="block w-full bg-gray-800 placeholder-gray-600 rounded border border-gray-700 focus:border-yellow-500 focus:ring-2 focus:ring-yellow-800 text-lg outline-none text-gray-300 py-2 px-3 leading-8 transition-colors duration-200 ease-in-out h-1"
            style={{ height: '2.625rem' }}
          >
            <option>jsDoc</option>
            <option>xmlDoc</option>
            <option>adjamDoc</option>
          </select>
        </label>

        <label className="mb-6 text-white">
          Attribution:
          <pre
            className="overflow-x-auto
        scrollbar-thin scrollbar-thumb-yellow-600 hover:scrollbar-thumb-yellow-500 scrollbar-track-gray-700 bg-yellow-999 text-yellow-400 p-4 rounded"
          >
            {docType === DocType.xmlDoc && <code>{xmlDoc}</code>}
            {docType === DocType.jsDoc && <code>{jsDoc}</code>}
            {docType === DocType.adjamDoc && <code>{adjamDoc}</code>}
          </pre>
        </label>
        <button
          className="text-white bg-yellow-600 border-0 py-2 px-6 hover:bg-yellow-500 rounded text-lg outline-none focus:outline-none focus:border-yellow-500 focus:ring-2 focus:ring-yellow-800 uppercase"
          type="button"
          onClick={() => send('COPY')}
          disabled={current.matches('copying')}
        >
          {current.matches('copying') ? 'Copied!' : 'Copy'}
        </button>
      </div>
    </Main>
  );
};

export default Index;
