import styled from 'styled-components/macro';

export const SLayout = styled.div`
  display: flex;
  flex-direction: column;
  max-height: calc(100vh - 180px);
  overflow: auto;

  ::-webkit-scrollbar {
    display: none !important;
  }

  -ms-overflow-style: none !important;
  scrollbar-width: none !important;
`;
