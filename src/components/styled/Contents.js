import styled from 'styled-components';

const Contents = styled.div`
  margin: 0 auto;
  width: 1200px;
  min-height: calc(100vh - 37px);
  padding-top: 65px;
  padding-bottom: 5px;
  display: flex;
  justify-content: center;
  background-color: whitesmoke;
  border-radius: 3px;
  @media only screen and (max-width: 1250px) {
    flex-direction: column;
    width: 660px;
  }
  @media only screen and (max-width: 680px) {
    width: 400px;
  }
`;

export default Contents;
