export type TProductStyle = {
  margin?: string;
  marginRight?: string | number;
  marginTop?: string | number;
  marginBottom?: string | number;
  alignSelf?: string;
  align?: string;
};

export interface TProductDisclosureProps extends TProductStyle {
  extraStyles?: { [key: string]: string | number | undefined };
}

export type TProductStyleProps = {
  $styles?: TProductStyle;
  $extraStyles?: { [key: string]: string | number | undefined };
};
