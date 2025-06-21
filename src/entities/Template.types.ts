export type TemplateModel_v1 = {
  id: number;
  name: string;
  type: number;
  mod: number;
  usn: number;
  sortf: number;
  did: unknown | null;
  tmpls: Template_v1[];
  flds: Field_v1[];
  css: string;
  latexPre: string;
  latexPost: string;
  latexsvg: boolean;
  req: Array<Array<number[] | number | string>>;
  originalStockKind: number;
};

export type Field_v1 = {
  name: string;
  ord: number;
  sticky: boolean;
  rtl: boolean;
  font: string;
  size: number;
  description: string;
  plainText: boolean;
  collapsed: boolean;
  excludeFromSearch: boolean;
  id: null;
  tag: null;
  preventDeletion: boolean;
};

export type Template_v1 = {
  name: string;
  ord: number;
  /*
   * HTML code of the template
   */
  qfmt: string;
  afmt: string;
  bqfmt: string;
  bafmt: string;
  did: null;
  bfont: string;
  bsize: number;
};
