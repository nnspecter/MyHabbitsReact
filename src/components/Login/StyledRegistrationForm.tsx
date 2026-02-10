"use client"
import styles from "./StyledLoginForm.module.scss"
import { Button, styled, TextField } from '@mui/material'
import { useRouter } from 'next/navigation';
import { startRegistration } from "@/shared/api/api";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import Link from "next/link";
import { MountAnimation } from "@/animations/MountAnimation";
import { RegistrationData } from "@/shared/api/types/login";



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
  const [repeatPasswordError, setRepeatPasswordError] = useState(false);
  const RegMutation = useMutation({
    mutationFn: (data: RegistrationData) => startRegistration(data),  
    onSuccess: () => {
        router.push("/login");
    },
    onError: (error) => {
        console.error(error);
    }
  });


    const handleSubmit = async (username: string, password: string, repeatPassword: string) => {

        if (!username || !password) {
            return;
        }
        if(password !== repeatPassword){
            setRepeatPasswordError(true);
            return;
        }
        setRepeatPasswordError(false);
        
        console.log({username: username, password: password})
        await RegMutation.mutate({ name: username, password });

    } 

  return (
    <MountAnimation key={"registration"}> 
        <div className={styles.form}>
            <form onSubmit ={(e:React.FormEvent<HTMLFormElement>) => {
                e.preventDefault();
                const form = e.currentTarget;
                const login = (form.elements.namedItem('login-input') as HTMLInputElement).value.trim();
                const password = (form.elements.namedItem('password-input') as HTMLInputElement).value.trim();
                const repeatPassword = (form.elements.namedItem('repeat-password-input') as HTMLInputElement).value.trim();
                handleSubmit(login, password, repeatPassword);
            }}>
                <div className={styles.formPanel}>
                    <div className={styles.name}>Регистрация</div>
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
                        <CssTextField 
                        label="Повторите пароль" 
                        placeholder="Введите пароль снова" 
                        id="repeat-password-input" 
                        type="password"
                        
                        />
                        {RegMutation.isError && <div className={styles.errorText}>Ошибка сервера</div>}
                        {repeatPasswordError && <div className={styles.errorText}>Пароли не совпадают</div>}
                    </div>
                        <div className={styles.formButton}>
                            <Button variant='contained' type="submit" sx={{background: "#454545"}} style={{width: "300px", fontSize: "12pt", fontWeight: "bold", borderRadius: "10px"}}>Зарегистрироваться</Button>
                            <div className={styles.lowerText}>
                            Есть аккаунт?  
                            <Link href="/login">Войти</Link>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    </MountAnimation>
  )
}

export default AuthentificationForm
