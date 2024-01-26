import styled from 'styled-components';

export const SMessagesList = styled.div`
  display: flex;
  flex-direction: column;
  max-height: calc(100vh - 250px);
  padding: 3px;
  overflow: hidden;
  overflow-y: auto;
  ::-webkit-scrollbar {
    display: none !important;
  }

  -ms-overflow-style: none !important;
  scrollbar-width: none !important;
`;
