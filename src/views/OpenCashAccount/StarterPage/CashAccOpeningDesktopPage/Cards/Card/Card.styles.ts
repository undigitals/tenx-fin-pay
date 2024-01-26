import styled from 'styled-components';
import { getColor } from 'utils/helpers/styleHelpers';

export const SContainer = styled.div`
  position: relative;
  overflow: hidden;
  background: ${getColor('white')} no-repeat right bottom;
  padding: 32px;
  border-radius: 20px;
  min-width: 488px;
  width: 48%;
  margin-bottom: 20px;
  height: auto;

  .icon-sign {
    position: absolute;
    width: 160px;
    height: 160px;
    right: -26px;
    bottom: -40px;
    z-index: 1;

    .icon {
      width: 60px;
      height: 60px;
    }
  }

  .title-container {
    display: flex;
    justify-content: space-between;
    flex: 1;
    margin-bottom: 36px;
    cursor: pointer;
  }

  ul {
    position: relative;
    padding: 0 75px 0 0;
    margin: 0;
    height: auto !important;
    overflow: hidden;
    transition: height 0.3s ease;
    z-index: 10;
  }

  &.collapsed {
    align-self: flex-start;
    .icon-sign {
      display: none;
    }
    ul {
      height: 0 !important;
    }
    .title-container {
      margin-bottom: 0;
    }
  }

  & .listItemLvl1,
  & .listItemLvl2 {
    display: inline-flex;
    list-style: none;
    margin-left: 0;
    padding: 0;
  }

  & .listItemLvl1:before,
  & .listItemLvl2:before {
    // Bullet character: •
    content: '\u2022';
    color: ${getColor('blue')};
    font-weight: bold;
    display: block;
    margin-left: 8px;
    margin-right: 12px;
  }

  & .listItemLvl2 {
    margin-left: 26px;
  }

  & .link {
    color: ${getColor('blue')};
    border-bottom: 1px solid ${getColor('blue')};
  }

  & .link:hover {
    border: none;
  }
`;
