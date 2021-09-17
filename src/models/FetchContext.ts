import DocType from './DocType';

type FetchContext = {
  answerId: string;
  jsDoc: string;
  xmlDoc: string;
  docType: DocType;
};

export default FetchContext;
