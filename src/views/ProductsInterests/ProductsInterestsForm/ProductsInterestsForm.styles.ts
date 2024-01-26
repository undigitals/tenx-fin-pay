import styled from 'styled-components/macro';

export const SWaitlistFormInnerWrapper = styled.div`
  background-color: #fff;
  padding: 45px 25px 62px;
  margin-bottom: 28px;
  border-radius: 20px;
  width: 100%;
`;

export const SFormWrapper = styled.div`
  flex: 1 0 auto;
  display: flex;
  flex-direction: column;

  form {
    flex: 1 1 auto;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;

    .ant-checkbox-indeterminate .ant-checkbox-inner:after {
      content: none;
    }
  }

  button[type='submit'] {
    margin-bottom: 10px;
  }

  button[type='button'] {
    width: 100%;
    padding: 12px;
    border: none;
  }
`;
