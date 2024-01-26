export type TAmountType = 'full' | 'percent' | 'dollar';
export type InternalNamePath = (string | number)[];
export type NamePath = string | number | InternalNamePath;
export type EntryType<T> = [string, T];

export interface IFieldChangeTypes {
  readonly touched?: boolean;
  readonly validating?: boolean;
  readonly errors?: string[];
  readonly warnings?: string[];
  readonly value?: boolean;
}

export interface IFormChangeProps extends IFieldChangeTypes {
  readonly name: NamePath;
}
