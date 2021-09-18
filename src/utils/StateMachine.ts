import { createMachine, assign } from 'xstate';

import DocType from '../models/DocType';
import FetchContext from '../models/FetchContext';
import fetchStackOverflowApi from '../services/StackOverflow';
import { AppDefault } from './AppDefault';
import copy from './ClipboardUtils';
import { buildAdjamDoc, buildJsDoc, buildXmlDoc } from './DocUtils';

const mapDocType = (
  value: DocType,
  context: { jsDoc: string; xmlDoc: string; adjamDoc: string }
): string => {
  switch (value) {
    case DocType.xmlDoc:
      return context.xmlDoc;
    case DocType.jsDoc:
      return context.jsDoc;
    case DocType.adjamDoc:
      return context.adjamDoc;
    default:
      // eslint-disable-next-line no-console
      console.error(`docType not implemented`);
      return context.jsDoc;
  }
};

export const FetchMachine = createMachine<FetchContext>({
  initial: 'idle',
  context: {
    jsDoc: buildJsDoc(AppDefault),
    xmlDoc: buildXmlDoc(AppDefault),
    adjamDoc: buildAdjamDoc(AppDefault),
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
          actions: (context, _) => copy(mapDocType(context.docType, context)),
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
        src: (context, _) => fetchStackOverflowApi(context.answerId),
        onDone: {
          target: 'fetch',
          actions: assign({
            jsDoc: (_, event) => buildJsDoc(event.data),
            xmlDoc: (_, event) => buildXmlDoc(event.data),
            adjamDoc: (_, event) => buildAdjamDoc(event.data),
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
