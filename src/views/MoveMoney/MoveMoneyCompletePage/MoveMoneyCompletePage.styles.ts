import styled from 'styled-components/macro';

const MoveMoneyCompletePage = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100%;
  background: linear-gradient(180deg, rgba(62, 79, 229, 0.8) 0%, #393b6b 100%);
`;
const Header = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-bottom: 1px dashed #e0e4eb;
`;

const Wrapper = styled.div`
  background: #ffffff;
  border-radius: 12px;
  width: 357px;
  padding: 2.3rem 1.6rem;
  h2 {
    margin-top: 2rem;
  }
  table {
    font-size: 16px;
    line-height: 21px;
    color: #353131;
    width: 100%;
    margin-top: 2rem;
    tr {
      td {
        padding: 1rem 0;
      }
      td:last-child {
        text-align: right;
        font-weight: bold;
      }
    }
  }
  button {
    margin-top: 2rem;
  }
`;

const IconContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 68px;
  height: 68px;
  background: rgba(62, 79, 229, 0.1);
  border-radius: 8px;

  .icon-success {
    width: 4.4rem;
    height: 4.4rem;
  }
`;

export { MoveMoneyCompletePage, Wrapper, Header, IconContainer };
