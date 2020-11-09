import React, { useState, useRef, useEffect, useContext } from 'react';

import { useCollectionData } from 'react-firebase-hooks/firestore';
import { HiOutlineEmojiHappy } from 'react-icons/hi';
import { MdSend, MdAttachFile, MdMoreVert } from 'react-icons/md';
import 'emoji-mart/css/emoji-mart.css';
import { Picker } from 'emoji-mart';

import { firestore } from '../../../services/firebase';
import { AuthContext } from '../../../hooks/auth'

import { Container, Message } from './styles'

import AnonIcon from '../../../assets/anon_icon.svg';

export default function Chat() {
  const authContext = useContext(AuthContext);

  const dummy = useRef<null | HTMLElement>(null);
  const messagesRef = firestore().collection('messages');
  const query = messagesRef.orderBy('createdAt').limitToLast(40);
  const [messages] = useCollectionData(query, { idField: 'id' });
  const [formValue, setFormValue] = useState('');
  const [showEmojis, setShowEmojis] = useState(false);

  useEffect(() => {
    dummy.current!.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const sendMessage = async (e: any) => {
    e.preventDefault();

    if (!formValue) return false;

    const { uid, photoURL, displayName, isAnonymous } = authContext.user!;

    await messagesRef.add({
      text: formValue,
      createdAt: firestore.FieldValue.serverTimestamp(),
      uid,
      photoURL,
      displayName: displayName,
      isAnonymous
    });

    setFormValue('');
    dummy.current!.scrollIntoView({ behavior: 'smooth' })
  }

  const onEmojiClick = (event: any) => {
    setFormValue(formValue + event.native)
  }

  return (
    <Container>
      <main>
        {messages && messages.map((msg: any) => <ChatMessage key={msg.id} message={msg} />)}
        <span ref={dummy}></span>
      </main>

      <form onSubmit={sendMessage}>
        <div className="chatWindow--footer">
          <div className="chatWindow--pre">
              {showEmojis ? (
                <span className="emojiPicker" onBlurCapture={() => setShowEmojis(false)}>
                  <Picker
                    onClick={onEmojiClick}
                    emojiTooltip={true}
                    title="pick your emoji"
                    emoji="point_up"
                    theme="dark"
                    showPreview={true}
                    showSkinTones={false}
                  // defaultSkin="4"
                  />
                </span>
              ) : (<></>)}
            <div className="chatWindow--btn">
              <HiOutlineEmojiHappy style={{ color: "#fff" }}
                onClick={() => setShowEmojis(!showEmojis)}
              />
            </div>
          </div>
          <div className="chatWindow--inputarea">
            <input className="chatWindow--input"
              value={formValue} onFocus={() => setShowEmojis(false)} onChange={(e) => setFormValue(e.target.value)} placeholder="say something nice"
            />
          </div>
          <div className="chatWindow--pos">
            <button className="chatWindow--btn send-btn" type="submit" disabled={!formValue}>
              <MdSend style={{ color: "#fff" }} />
            </button>
          </div>
        </div>
      </form>
    </Container>
  );
}

function ChatMessage(props: any) {
  const authContext = useContext(AuthContext);

  const { text, uid, photoURL, displayName, createdAt, isAnonymous } = props.message;
  // let date = new Date().toLocaleDateString('pt-BR') + ' ' + new Date().toLocaleTimeString('pt-BR');

  // if (createdAt)
  //   date = createdAt.toDate().toLocaleDateString('pt-BR') + ' ' + createdAt.toDate().toLocaleTimeString('pt-BR')

  const messageClass = uid === authContext.user?.uid ? 'sent' : 'received';

  return (
    <Message type={messageClass} isAnonymous={isAnonymous}>
      <img src={photoURL || AnonIcon } alt="Sem Foto" />
      <div>
        <strong>{isAnonymous ? 'Anonymous' : displayName} </strong>
        <p>{text}</p>
      </div>
    </Message>
  )
}
