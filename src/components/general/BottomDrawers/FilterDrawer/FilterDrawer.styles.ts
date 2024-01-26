import styled from 'styled-components';
import { Drawer, Slider } from 'antd';
import React from 'react';
import { getColor, ifProp } from 'utils/helpers/styleHelpers';
import { Icon } from 'components/general/Icon/Icon';

interface ISOutlinedCard {
  cursorPointer?: boolean;
}

export const SOutlinedCard = styled.div<ISOutlinedCard>`
  margin: 8px 0 16px 0;
  padding: 20px 24px;
  border: 2px solid #f5f4f4;
  border-radius: 20px;
  cursor: ${ifProp('cursorPointer', 'pointer', 'default')};
`;

export const SDrawer = styled(Drawer)`
  .ant-modal-content {
    border-radius: 20px;
    opacity: 1;
    margin: 0 20px;
    box-shadow: none;
    padding: 45px 24px 24px;
  }

  .ant-modal-body {
    ::-webkit-scrollbar {
      display: none !important;
    }

    -ms-overflow-style: none !important;
    scrollbar-width: none !important;
  }

  .ant-modal-wrap {
    top: 48% !important;
  }
`;

export const SSlider = styled(Slider)`
  .ant-slider {
    &-rail {
      background-color: ${getColor('charcoal5')} !important;
    }

    &-track {
      background-color: ${getColor('blue')} !important;
    }

    &-handle {
      border-color: ${getColor('white')} !important;
      background-color: ${getColor('blue')} !important;
      width: 20px;
      height: 20px;
      margin-top: -8px;
    }
  }
`;

export const SMaskStyle: React.CSSProperties = {
  background: 'rgba(53, 49, 49, 0.8)',
  backdropFilter: 'blur(4px)',
};

export const SContentWrapperStyle: React.CSSProperties = {
  borderRadius: '24px 24px 0px 0px',
};

export const SIcon = styled(Icon)`
  position: absolute;
  top: 12px;
  right: 12px;
`;

export const SAmountSeparator = styled.div`
  width: 3%;
  margin: 0 10px;
  border: 1px solid ${getColor('charcoal20')};
`;
