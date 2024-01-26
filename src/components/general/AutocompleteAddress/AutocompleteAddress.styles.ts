import styled from 'styled-components';

export const SSelectContainer = styled.div<{ isOpen: boolean }>`
  display: flex;
  flex-direction: column;

  & ul.address-select-dropdown {
    list-style: none;
    display: ${({ isOpen }) => (isOpen ? 'flex' : 'none')};
    flex-direction: column;
    align-items: stretch;
    position: absolute;
    top: 60px;
    z-index: 999 !important;
    background: white;
    padding: 10px;
    border: 2px solid #eaeaea;
    border-radius: 8px;
    box-shadow: 0 0 8px rgba(0, 0, 0, 0.1);

    & li.dropdown-item {
      padding: 4px 0;
    }
  }
`;
