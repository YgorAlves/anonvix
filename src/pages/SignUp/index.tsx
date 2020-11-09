import React, { useCallback, useContext, useRef } from 'react';
import { FiArrowLeft, FiMail, FiUser, FiLock } from 'react-icons/fi';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import * as Yup from 'yup';
import { Link, useHistory } from 'react-router-dom';

import { useToast } from '../../hooks/toast'

import getValidationErrors from '../../utils/getValidationErrors';

import { Container, Content, AnimationContainer, Background } from './styles';
import firebase from '../../services/firebase'

import Input from '../../components/Input';
import Button from '../../components/Button';
import { AuthContext } from '../../hooks/auth';
import { auth } from 'firebase';

interface SignUpFormData {
  name: string;
  email: string;
  password: string;
}

const SignUp: React.FC = () => {

  const formRef = useRef<FormHandles>(null);

  const { addToast } = useToast();

  const authContext = useContext(AuthContext);

  const history = useHistory();

  const handleSubmit = useCallback(async (data: SignUpFormData) => {
    try {

      formRef.current?.setErrors({});

      const schema = Yup.object().shape({
        name: Yup.string().required('Nome obrigatório'),
        email: Yup.string().required('E-mail obrigatório').email('Digite um e-mail válido'),
        password: Yup.string().min(6, 'No mínimo 6 dígitos'),
      })

      await schema.validate(data, {
        abortEarly: false,
      });

      firebase
        .auth()
        .createUserWithEmailAndPassword(data.email, data.password)
        .then((userCredential: firebase.auth.UserCredential) => {
          authContext.setUser(userCredential);
          const db = firebase.firestore();

          db.collection("Users")
            .doc(userCredential.user!.uid)
            .set({
              email: data.email,
              displayName: data.name,
            })
            .then(() => {
              history.push('/dashboard')
              addToast({
                type: 'success',
                title: 'Cadastro realizado!',
                description: 'Voce será redirecionado ao Dashboard!'
              })
            })
            .catch((error) => {
              addToast({
                type: 'error',
                title: 'Erro no cadastro',
                description: error.message
              });
            })
          auth().currentUser?.updateProfile({
            displayName: data.name
          })

        })

    } catch (err) {

      if (err instanceof Yup.ValidationError) {
        const errors = getValidationErrors(err)
        formRef.current?.setErrors(errors);

        return;
      }

      addToast({
        type: 'error',
        title: 'Erro no cadastro',
        description: 'Ocorreu um erro ao fazer cadastro, tente novamente.'
      });

    }
  }, [addToast, history, authContext]);


  return (
    <Container>
      <Background />

      <Content>
        <AnimationContainer>

          {/* <img src="" alt="Anonvix" /> */}
          <h1 style={{ color: "#ff9000" }}>Anonvix</h1>

          <Form ref={formRef} onSubmit={handleSubmit}>
            <h1>Faça seu cadastro</h1>

            <Input icon={FiUser} name='name' placeholder="Nome" />
            <Input icon={FiMail} name='email' placeholder="E-mail" />

            <Input icon={FiLock} name="password" type="password" placeholder="Senha" />

            <Button type="submit">Cadastrar</Button>

          </Form>

          <Link to="/">
            <FiArrowLeft />
          Voltar para logon
        </Link>
        </AnimationContainer>

      </Content>

    </Container>
  );
}

export default SignUp;
