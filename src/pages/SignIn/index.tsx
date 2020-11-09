import React, { useRef, useContext } from 'react';
import { FiLogIn, FiMail, FiLock } from 'react-icons/fi';
import { FaGoogle, FaFacebookF, FaTheaterMasks } from 'react-icons/fa';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import * as Yup from 'yup';

import { AuthContext } from '../../hooks/auth'
import { useToast } from '../../hooks/toast';

import getValidationErrors from '../../utils/getValidationErrors';

import { Link, useHistory } from 'react-router-dom'
import { Container, Content, AnimationContainer, Background, SocialLogin, GoogleSignIn, FacebookSignIn, AnonymousignIn } from './styles';

import Input from '../../components/Input';
import Button from '../../components/Button';
import { auth } from '../../services/firebase'


const SignIn: React.FC = () => {

  const formRef = useRef<FormHandles>(null);

  const authContext = useContext(AuthContext)


  const { addToast } = useToast();
  const history = useHistory()

  const handleSubmit = async (data: { email: string, password: string }) => {
    try {

      formRef.current?.setErrors({});

      const schema = Yup.object().shape({
        email: Yup.string().required('E-mail obrigatório').email('Digite um e-mail válido'),
        password: Yup.string().required('Senha obrigatório'),
      })

      await schema.validate(data, {
        abortEarly: false,
      });

      auth()
        .signInWithEmailAndPassword(data.email, data.password)
        .then(res => {
          authContext.setUser(res);
          history.push('/dashboard');
          addToast({
            type: 'success',
            title: 'Login realizado',
            description: 'Login realizado com sucesso, voce será redirecionado para o Dashboard'
          });
        })
        .catch(error => {
          addToast({
            type: 'error',
            title: 'Erro na autenticação',
            description: 'Ocorreu um erro ao fazer login, cheque as credenciais'
          });
          return;
        })


    } catch (err) {
      if (err instanceof Yup.ValidationError) {
        const errors = getValidationErrors(err)
        formRef.current?.setErrors(errors);

        return;
      }

      // disparar um toast
      addToast({
        type: 'error',
        title: 'Erro na autenticação',
        description: 'Ocorreu um erro ao fazer login, cheque as credenciais'
      });

    }

  };

  const signInWithGoogle = () => {
    const provider = new auth.GoogleAuthProvider();
    auth().signInWithPopup(provider)
      .then(() => {
        addToast({
          type: 'success',
          title: 'Login realizado',
          description: 'Login realizado com sucesso, voce será redirecionado para o Dashboard'
        });
      })
  }

  const signInWithFacebook = () => {
    const provider = new auth.FacebookAuthProvider();
    auth().signInWithPopup(provider)
      .then(() => {
        addToast({
          type: 'success',
          title: 'Login realizado',
          description: 'Login realizado com sucesso, voce será redirecionado para o Dashboard'
        });
      })
  }

  const signInAnonymously = () => {
    auth().signInAnonymously()
      .then(() => {
        addToast({
          type: 'success',
          title: 'Login realizado',
          description: 'Login realizado com sucesso, voce será redirecionado para o Dashboard'
        });
      })
  }

  return (
    <Container>

      <Content>
        <AnimationContainer>

          {/* <img src="" alt="Anonvix" /> */}
          <h1 style={{ color: "#ff9000" }}>Anonvix</h1>

          <Form ref={formRef} onSubmit={handleSubmit}>
            <h1>Faça seu logon</h1>


            <Input icon={FiMail} name='email' placeholder="E-mail" />

            <Input icon={FiLock} name="password" type="password" placeholder="Senha" />

            <Button type="submit">Entrar</Button>


            <h5 style={{ marginTop: '10px' }}>Ou logue utilizando</h5>

            <SocialLogin>
              <div>
                <GoogleSignIn type="button" onClick={signInWithGoogle}><FaGoogle size={20} /><span>Google</span></GoogleSignIn>
                <FacebookSignIn type="button" onClick={signInWithFacebook}><FaFacebookF size={20} /><span>Facebook</span></FacebookSignIn>
              </div>

              <AnonymousignIn type="button" onClick={signInAnonymously}><FaTheaterMasks size={20} /><span>Anônimo</span></AnonymousignIn>
            </SocialLogin>

            <a href="/forgot">Esqueci minha senha</a>


          </Form>
          <Link to="/signup">
            <FiLogIn />
            Criar conta
          </Link>


        </AnimationContainer>

      </Content>

      <Background />

    </Container>
  );
}

export default SignIn;
