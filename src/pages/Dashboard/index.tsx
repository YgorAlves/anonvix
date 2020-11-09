import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom'
import { AuthContext } from '../../hooks/auth';

import { Container, Header, HeaderContent, Profile, Content } from './styles';
import Chat from './Chat';
import Sidebar from './Sidebar';
import { FiPower } from 'react-icons/fi';
import { auth } from '../../services/firebase';
import { useToast } from '../../hooks/toast';
import AnonIcon from '../../assets/anon_icon.svg';

const Dashboard: React.FC = () => {

  const authContext = useContext(AuthContext);
  const { addToast } = useToast();
  const history = useHistory()

  const user = authContext.user;
  const { photoURL, displayName, isAnonymous } = user!;

  const handleSignOut = () => {
    auth().signOut()
      .then(() => {
        addToast({
          type: 'success',
          title: 'Logout realizado!',
          description: 'Logout realizado com sucesso, você será redirecionado para a Home'
        });
        history.push('/');
      })
  }

  return (
    <Container>
      <Header>
        <HeaderContent>
          <h2 style={{ color: "#ff9000" }}>Anonvix</h2>

          <Profile>
            {photoURL ? (
              <img src={photoURL} alt="Sem Foto" />
            ) : (
                <img src={AnonIcon} alt="Sem Foto" />
              )}
            <div>
              <span>Bem-vindo(a),</span>
              <strong>{isAnonymous ? 'Anonymous' : displayName}</strong>
            </div>
          </Profile>

          <button type="button" onClick={handleSignOut}>
            <FiPower />
          </button>
        </HeaderContent>
      </Header>

      <Content>
        {/* <Sidebar /> */}
        <Chat />
      </Content>

    </Container>
  );
}

export default Dashboard;
