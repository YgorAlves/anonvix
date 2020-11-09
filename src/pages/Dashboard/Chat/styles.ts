import styled, { css } from 'styled-components';

interface MessageProps {
  type: 'sent' | 'received',
  isAnonymous: boolean
}

export const Message = styled.div<MessageProps>`

  display: flex;
  flex-direction: column;
  padding: 5px;
  text-overflow: clip;

  p {
    background-color: #232323;
    box-shadow: 0 1px 1px #3a3a3a;
    color: #fcfcfc;
    flex-direction: column;
    padding: 2px;
    /* max-width:50ch; */
    display: flex;
    overflow-wrap: break-word;
    text-align: start;
    margin-top: 0.2em;


  }

  div {
      text-align: end;

      strong {
        color: #fff;
      }

    }

  ${props => props.type == 'received' && css`
    flex-direction: row;

    p {
      border-radius: 0px 10px 10px 10px;
    }
    div {
      text-align: start;
      strong {
        text-align: start;
      }
    }
  `}

  ${props => props.type == 'sent' && css`
    flex-direction: row-reverse;

    p {
      border-radius: 10px 0px 10px 10px;
    }

    div {
      text-align: end;

      strong {
        color: #ff9000;
      }

    }
  `}

  span {
    font-size: small;
    color: #fff;
  }

  img {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    margin: 2px 5px;
    padding: 0.3em;
  }

  ${props => props.isAnonymous && css`

    img {
      background-color: #dadce0;
    }

  `}



`

export const Container = styled.div`

  overflow-wrap: break-word;
  word-wrap: break-word;

  main {

    -webkit-box-shadow: 0px 0px 17px 2px rgba(0,0,0,0.71);
    -moz-box-shadow: 0px 0px 17px 2px rgba(0,0,0,0.71);
    box-shadow: 0px 0px 17px 2px rgba(0,0,0,0.71);
    display: flex;
    position: fixed;
    height: 75vh;
    min-width: 100%;
    width: 100%;
    border-radius: 10px;

    overflow-y: scroll;
    flex-direction: column;
  }

  main::-webkit-scrollbar {
    width: 0.35rem;
  }

  main::-webkit-scrollbar-track {
    background: #1e1e24;
  }

  main::-webkit-scrollbar-thumb {
    background: #ff9000;
  }

  p {
    max-width: 500px;
    margin-bottom: 10px;
    line-height: 24px;
    padding: 10px 20px;
    position: relative;
    color: white;
  }

  form {
    height: 10vh;
    position: fixed;
    bottom: 1em;
    /* background-color: rgb(24, 23, 23); */
    width: 100%;
    display: flex;
    justify-content: stretch;
    font-size: 1.5rem;
  }

  .chatWindow--btn {
    font-size: 30px;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    outline: 0;
  }

  .chatWindow--footer {
    height: 5.5vh;
    width: 100%;
    display: flex;
    align-items: center;
    background-color: #504e4e;
    border-radius: 10px;
    margin: 1em 0.2em 1em 0.2em;
    padding: 10px;
  }

  .chatWindow--pre {
    display: flex;
    padding-right: 10px;
  }

  .chatWindow--inputarea {
    flex: 1;
  }

  .chatWindow--input {
    width: 100%;
    height: 40px;
    border: 0;
    outline: 0;
    background-color: #292929;
    border-radius: 20px;
    font-size: 15px;
    color: #fff;
    padding-left: 15px;

  }

  .chatWindow--pos {
    display: flex;
    padding-left: 35px;
  }

  .emojiPicker {
    position: absolute;
    bottom: 10vh;
    left: 21vw;
    float: left;
  }

  .send-btn {
    background-color: unset;
    border: 0;
    padding: 0px !important;
  }

`
