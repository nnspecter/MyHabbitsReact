"use client"
import styles from "./StyledLoginForm.module.scss"
import { Button, styled, TextField } from '@mui/material'
import { useRouter } from 'next/navigation';
import {startLogin } from "@/shared/api/api";
import { useMutation } from "@tanstack/react-query";
import Link from "next/link";
import { MountAnimation } from "@/animations/MountAnimation";
import { LoginData } from "@/shared/api/types/login";



const AuthentificationForm = () => {
  const CssTextField = styled(TextField)({
    width: '300px',
    
    '& label': {
      color: '#454545', // обычный цвет label
    },
    '& label.Mui-focused': {
      color: '#454545', // цвет label при фокусе
    },
    '& .MuiInput-underline:after': {
      borderBottomColor: '#454545', // для standard варианта
    },
    
    '& .MuiOutlinedInput-root': {
      '& input': {
        color: '#454545', // **текст, который вводит пользователь**
      },
      '& input::placeholder': {
        color: '#686868ff', // placeholder
        opacity: 1,
      },
      // autofill
      '& input:-webkit-autofill': {
        WebkitBoxShadow: '0 0 0 1000px rgba(0,0,0,0) inset', // прозрачный
        WebkitTextFillColor: '#454545', // цвет текста
        transition: 'background-color 5000s ease-in-out 0s', // обманка для Chrome
      }, 
      '& fieldset': {
        borderColor: '#454545', // обычная рамка
        borderRadius: '10px',
      },
      '&:hover fieldset': {
        borderColor: '#454545', // рамка при наведении
        borderRadius: '10px',
      },
      '&.Mui-focused fieldset': {
        borderColor: '#454545', // рамка при фокусе
      },
    },
  });

  const router = useRouter();
  const LoginMutation = useMutation({
    mutationFn: (data: LoginData) => startLogin(data),  
    onSuccess: () => {
        router.push("/table");
    },
    onError: (error) => {
        console.error(error);
    }
});


    const handleSubmit = async (username: string, password: string) => {

        if (!username || !password) {
            return;
        }

        console.log({username: username, password: password})
        await LoginMutation.mutate({ username, password });
    } 

  return (
    <MountAnimation key={"login"}>
      <div className={styles.form}>
        <form onSubmit ={(e:React.FormEvent<HTMLFormElement>) => {
          e.preventDefault();
          const form = e.currentTarget;
          const login = (form.elements.namedItem('login-input') as HTMLInputElement).value.trim();
          const password = (form.elements.namedItem('password-input') as HTMLInputElement).value.trim();
          handleSubmit(login, password);
        }}>
          <div className={styles.formPanel}>
            <div className={styles.name}>Вход</div>
            <div className={styles.formLabels}>
              <CssTextField 
                label="Логин или номер телефона" 
                placeholder="Введите логин" 
                id="login-input"
                type="text"
              />

              <CssTextField 
                label="Пароль" 
                placeholder="Введите пароль" 
                id="password-input" 
                type="password"
                
              />
              {LoginMutation.isError && <div className={styles.errorText}>Введены неверные данные</div>}
            </div>
            <div className={styles.formButton}>
              <Button variant='contained' type="submit"  style={{width: "300px", fontSize: "12pt", fontWeight: "bold", borderRadius: "10px"}}>Войти</Button>
              <div className={styles.lowerText}>
                Нет аккаунта? 
                <Link href="/registration">Зарегистрироваться</Link>
              </div>
              
            </div>
          </div>
        </form>
      </div>
    </MountAnimation>
  )
}

export default AuthentificationForm
