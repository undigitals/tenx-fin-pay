import { lighten, transparentize } from 'polished';
import React, { forwardRef } from 'react';
import styled from 'styled-components';
import { getColor } from 'utils/helpers/styleHelpers';

const SDayPickerContainer = styled.div`
  --color-transparent: ${getColor('transparent')};
  --color-white: ${getColor('white')};
  --color-charcoal: ${getColor('charcoal')};
  --color-charcoal5: ${getColor('charcoal5')};
  --color-charcoal70: ${getColor('charcoal70')};
  --color-blue: ${getColor('blue')};
  --color-blue5: ${getColor('blue5')};
  --color-charcoal-transparent25: ${(props) => transparentize(0.75, getColor('charcoal')(props))};
  --color-charcoal-lighten30: ${(props) => lighten(0.3, getColor('charcoal')(props))};
`;

const SDayPickerContainerForwardRef = forwardRef<HTMLDivElement, React.ComponentProps<typeof SDayPickerContainer>>((props, ref) => <SDayPickerContainer {...props} ref={ref} />);

export { SDayPickerContainerForwardRef as SDayPickerContainer };
