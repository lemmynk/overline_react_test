// @flow

// Flow type for any imported Css/Scss modules
declare module CSSModule {
  declare var exports: { [key: string]: string };
}

declare type Data = { [key: string]: any };

declare type KeyTextObject = {
  key: string,
  text: string,
  disabled?: boolean,
};

declare type AxiosResponseProps = {
  data: any,
  status: number,
  statusText: string,
  headers: Object,
  config: Object,
};

declare type SaveCallback = (AxiosResponseProps) => void;

declare type DeleteCallback = (AxiosResponseProps) => void;

declare type I18nTranslator = (string, Object) => string;
