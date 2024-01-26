import React from 'react';
import { Form } from 'antd';
import { useTheme } from 'styled-components';
import { Icon } from 'components/general/Icon/Icon';
import { StateManagerProps } from 'react-select/dist/declarations/src/useStateManager';
import Select, { ClearIndicatorProps, FormatOptionLabelMeta } from 'react-select';
import { customStyles } from './BaseSelect.styles';

export const BaseSelect: React.FC<StateManagerProps> = ({ ...props }) => {
  const { status } = Form.Item.useStatus();
  const theme = useTheme();

  // For the custom clear icon
  const components = {
    ClearIndicator: (properties: ClearIndicatorProps) => {
      const {
        children = <Icon name="circleClose" color="charcoal70" size="big" cursorPointer />,
        innerProps: { ref, ...restInnerProps },
      } = properties;
      return (
        <div {...restInnerProps} ref={ref}>
          {children}
        </div>
      );
    },
  };

  // For matching letters design
  const formatOptionLabel = ({ label }: any, { inputValue }: FormatOptionLabelMeta<unknown>) => {
    if (!inputValue) return label;

    const normalizedInputValue = inputValue.toLowerCase();
    const normalizedLabel = label.toLowerCase();

    if (normalizedLabel.startsWith(normalizedInputValue)) {
      const matchedPart = label.slice(0, inputValue.length);
      const remainingPart = label.slice(inputValue.length);

      return (
        <>
          <strong>{matchedPart}</strong>
          {remainingPart}
        </>
      );
    }

    return label;
  };

  return <Select {...props} formatOptionLabel={formatOptionLabel} components={components} styles={customStyles(theme, status)} />;
};
