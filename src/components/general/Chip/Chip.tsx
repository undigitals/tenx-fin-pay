import React from 'react';
import { TChipProps, TChipStyle } from './Chip.types';
import { SChip, SChipContentLayout, SChipIconLayout, SChipIconLayoutImg, SChipImgLayout } from './Chip.styles';

export const Chip: React.FC<TChipProps> = ({
  size = 'middle',
  preset = 'default',
  isActive = false,
  id,
  value = '',
  children,
  withImage = false,
  withIcon = false,
  withClose = false,
  imageSrc = '',
  imgAlt = '',
  iconName = '',
  isDisabled = false,
  onChipClick = () => {},
  onCloseClick = () => {},
  extraStyles,
  className,
  ...props
}) => {
  const styleProps: TChipStyle = {
    margin: props.margin,
    marginTop: props.marginTop,
    marginLeft: props.marginLeft,
    marginRight: props.marginRight,
    marginBottom: props.marginBottom,
    padding: props.padding,
    paddingTop: props.paddingTop,
    paddingLeft: props.paddingLeft,
    paddingRight: props.paddingRight,
    paddingBottom: props.paddingBottom,
  };

  const onChipClickAction = () => {
    if (!isDisabled) {
      onChipClick(value, id);
    }
  };

  const onCloseClickAction = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!isDisabled) {
      onCloseClick(id, e);
    }
  };

  return (
    <SChip $size={size} $preset={preset} $styleProps={styleProps} $extraStyles={extraStyles} $isActive={isActive} className={className} onClick={onChipClickAction} data-testid={props['data-testid']}>
      {withImage && (
        <SChipImgLayout>
          <img src={imageSrc} alt={imgAlt} width={24} height={24} />
        </SChipImgLayout>
      )}

      {withIcon && (
        <SChipIconLayout>
          <SChipIconLayoutImg name={iconName} color="transparent" size="smaller" />
        </SChipIconLayout>
      )}

      <SChipContentLayout>{children}</SChipContentLayout>

      {withClose && (
        <span role="button" onClick={onCloseClickAction} tabIndex={0} onKeyDown={() => {}}>
          x
        </span>
      )}
    </SChip>
  );
};
