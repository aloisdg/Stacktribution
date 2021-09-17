import { createMachine, assign } from 'xstate';

import DocType from '../models/DocType';
import FetchContext from '../models/FetchContext';
import fetchStackOverflowApi from '../services/StackOverflow';
import { AppDefault } from './AppDefault';
import copy from './ClipboardUtils';
import { buildJsDoc, buildXmlDoc } from './DocUtils';

export const FetchMachine = createMachine<FetchContext>({
  initial: 'idle',
  context: {
    jsDoc: buildJsDoc(AppDefault),
    xmlDoc: buildXmlDoc(AppDefault),
    answerId: '6176851',
    docType: DocType.jsDoc,
  },
  states: {
    idle: {
      on: {
        FETCH: 'loading',
        UPDATEID: {
          actions: assign({
            answerId: (_, event) => event.value,
          }),
        },
        COPY: {
          actions: (context, _) => {
            copy(
              context.docType === DocType.jsDoc ? context.jsDoc : context.xmlDoc
            );
          },
        },
        UPDATEDOCTYPE: {
          actions: assign({
            docType: (_, event) => event.value,
          }),
        },
      },
    },
    loading: {
      invoke: {
        src: (context, _) => {
          return fetchStackOverflowApi(context.answerId);
        },
        onDone: {
          target: 'fetch',
          actions: assign({
            jsDoc: (_, event) => buildJsDoc(event.data),
            xmlDoc: (_, event) => buildXmlDoc(event.data),
          }),
        },
        onError: {
          target: 'idle',
        },
      },
      on: {
        FETCHED_SUCCESSFULLY: {
          target: 'idle',
        },
      },
    },
    fetch: {
      on: {
        CLOSE: 'idle',
      },
    },
  },
});
