import styled from 'styled-components';

export const Container = styled.div`

`;

export const Header = styled.div`
  padding: 26px 15px;
  background: #28262e;
  margin-bottom: 20px;
`

export const HeaderContent = styled.div`
  max-width: 1120px;
  height: 5vh;
  margin: 0 auto;
  display: flex;
  align-items: center;

  > img {
    height: 80px;
  }

  button {
    margin-left: auto;
    background: transparent;
    border: 0;

    svg {
      color: #999591;
      width: 20px;
      height: 20px;

    }
  }

`

export const Profile = styled.div`
  display: flex;
  align-items: center;
  margin-left: 80px;

  img {
    width: 56px;
    height: 56px;
    border-radius: 50%;
    background-color: #dadce0;

  }

  div {
    display: flex;
    flex-direction: column;
    margin-left: 16px;
    line-height: 24px;

    span {
      color: #f4ede8;
    }

    strong {
      color: #ff9000;
    }
  }

`

export const Content = styled.main`
  /* display: flex; */
  /* justify-content: stretch; */
  max-width: 50px !important;
`
