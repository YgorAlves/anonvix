import styled, { keyframes } from 'styled-components'
import signInBackgroundImg from '../../assets/sign-in-background.png';
import { shade } from 'polished'

export const Container = styled.div`
  height: 100vh;
  display: flex;
  align-items: stretch;

`

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  justify-content: center;

  width: 100%;
  max-width: 700px;

`

const appearFromleft = keyframes`

  from {
    opacity: 0;
    transform: translateX(-50px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }

`


export const AnimationContainer = styled.div`

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  animation: ${appearFromleft} 1s;

form {
    margin: 70px 0 40px;
    width: 340px;
    text-align: center;

    h1 {
      margin-bottom:  24px;
    }

    a {
      color: #f4ede8;
      display: block;
      margin-top: 24px;
      text-decoration: none;
      transition: color 0.2s;

      &:hover {
        color: ${shade(0.2, '#f4ede8')}
      }
    }
  }

  > a {
    color: #ff9000;
      display: block;
      text-decoration: none;
      transition: color 0.2s;

      display: flex;
      align-items: center;

      svg {
        margin-right: 16px;
      }

      &:hover {
        color: ${shade(0.2, '#ff9000')}
      }
  }
`

export const Background = styled.div`
  flex: 1;
  background: url(${signInBackgroundImg}) no-repeat center;
  background-size: cover;

`

export const GoogleSignIn = styled.button`
      background: #d84c3b;
      height: 56px;
      border-radius: 10px;
      border: 0;
      padding: 0px 16px;
      color: #fcfcfc;
      width: 100%;
      font-weight: 500;
      margin-top: 16px;
      transition: background-color 0.2s;

      &:hover {
        background: ${shade(0.2, '#d84c3b')}
      }
`;

export const FacebookSignIn = styled.button`
      background: #3b5b9a;
      height: 56px;
      border-radius: 10px;
      border: 0;
      padding: 0px 16px;
      color: #fcfcfc;
      width: 100%;
      font-weight: 500;
      margin-top: 16px;
      transition: background-color 0.2s;

      &:hover {
        background: ${shade(0.2, '#3b5b9a')}
      }
`;

export const AnonymousignIn = styled.button`
      background: #292929;
      height: 56px;
      border-radius: 10px;
      border: 0;
      padding: 0px 16px;
      color: #fcfcfc;
      width: 100%;
      font-weight: 500;
      margin-top: 16px;
      transition: background-color 0.2s;

      &:hover {
        background: ${shade(0.2, '#292929')}
      }
`;

export const SocialLogin = styled.div`

    display: flex;
    justify-content: space-between;
    flex-direction: column;

    div {
      display: flex;
    }

    button {
      display: flex;
      padding: 10px;
      align-items: center;
      justify-content: center;


      & + button {
        margin-left: 10px;
      }

      svg {
        display: flex;
        padding: 7px;
      }

      span {
        display: flex;
        justify-content: center;
        padding: 7px;
      }
    }



`

