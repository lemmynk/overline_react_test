// @flow

// Flow type for any imported Css/Scss modules
declare module CSSModule {
  declare var exports: { [key: string]: string };
}

declare type Data = { [key: string]: any };

declare type SaveCallback = (Object, Object) => void;

declare type KeyTextObject = {
  key: string,
  text: string,
  disabled?: boolean,
};
