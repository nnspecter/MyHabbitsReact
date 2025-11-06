"use client"
import React from 'react'
import styles from "./Form.module.scss"
import { Button, styled, TextField } from '@mui/material'
import Link from 'next/link';
import { useLogin } from '../../api/mutations';
import { useRouter } from 'next/navigation';


const AuthentificationForm = () => {
  const CssTextField = styled(TextField)({
    width: '400px',
    '& label': {
      color: '#fff', // обычный цвет label
    },
    '& label.Mui-focused': {
      color: '#A0AAB4', // цвет label при фокусе
    },
    '& .MuiInput-underline:after': {
      borderBottomColor: '#B2BAC2', // для standard варианта
    },
    
    '& .MuiOutlinedInput-root': {
      '& input': {
        color: '#fff', // **текст, который вводит пользователь**
      },
      '& input::placeholder': {
        color: '#686868ff', // placeholder
        opacity: 1,
      },
      // autofill
      '& input:-webkit-autofill': {
        WebkitBoxShadow: '0 0 0 1000px rgba(0,0,0,0) inset', // прозрачный
        WebkitTextFillColor: '#fff', // цвет текста
        transition: 'background-color 5000s ease-in-out 0s', // обманка для Chrome
      }, 
      '& fieldset': {
        borderColor: '#E0E3E7', // обычная рамка
      },
      '&:hover fieldset': {
        borderColor: '#B2BAC2', // рамка при наведении
      },
      '&.Mui-focused fieldset': {
        borderColor: '#6F7E8C', // рамка при фокусе
      },
    },
  });
  const router = useRouter();
  const LoginMutation = useLogin();


  const handleSubmit = async (username, password) => {
    if (!username || !password) {
      return;
    }
    console.log({username: username, password: password})
    await LoginMutation.mutate({ username, password });
    await router.push("/table")
  } 

  return (
    <div className={styles.form}>
      <form onSubmit ={e => {
        e.preventDefault();
        handleSubmit(e.target['login-input'].value.trim(), e.target['password-input'].value.trim());
      }}>
        <div className={styles.formPanel}>
          ВХОД
          <div className={styles.formLabels}>
            <CssTextField 
              label="Логин или номер телефона" 
              placeholder="Введите логин" 
              id="login-input" 
            />
            <CssTextField 
              label="Пароль" 
              placeholder="Введите пароль" 
              id="password-input" 
            />
          </div>
          <Button variant='contained' type="submit" style={{ padding: "15px 175px" }}>ВОЙТИ</Button>
        </div>
      </form>
    </div>
  )
}

export default AuthentificationForm
