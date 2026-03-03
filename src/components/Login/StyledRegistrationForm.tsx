"use client"
import styles from "./StyledLoginForm.module.scss"
import { Button, Skeleton } from '@mui/material'
import { useRouter } from 'next/navigation';
import { useEffect, useState } from "react";
import Link from "next/link";
import { MountAnimation } from "@/animations/MountAnimation";
import { useRegistration } from "@/entities/api/mutations/mutations";
import { CssTextField } from "@/shared/customComponents/LoginField";


const AuthentificationForm = () => {
  const router = useRouter();
  const [repeatPasswordError, setRepeatPasswordError] = useState(false);
  const regMutation = useRegistration()

  useEffect(()=>{
    if (!regMutation.isSuccess) return;

    const timer = setTimeout(() => {
      router.push("/login")
    }, 3000);

    return () => clearTimeout(timer);
  },[regMutation.isSuccess])


  const handleSubmit =  async (username: string, password: string, repeatPassword: string) => {
      if (!username || !password) {
          return;
      }
      if(password !== repeatPassword){
          setRepeatPasswordError(true);
          return;
      }
      setRepeatPasswordError(false);

      console.log({username: username, password: password})
      regMutation.mutate({ name: username, password });
  } 

  return (
    <MountAnimation key={"registration"}> 
        <section className={styles.form}>
            <form onSubmit ={(e:React.FormEvent<HTMLFormElement>) => {
                e.preventDefault();
                const form = e.currentTarget;
                const login = (form.elements.namedItem('login-input') as HTMLInputElement).value.trim();
                const password = (form.elements.namedItem('password-input') as HTMLInputElement).value.trim();
                const repeatPassword = (form.elements.namedItem('repeat-password-input') as HTMLInputElement).value.trim();
                handleSubmit(login, password, repeatPassword);
            }}>
                <div className={styles.formPanel}>
                    {regMutation.isPending && <Skeleton style={{position: "absolute", inset: "0", zIndex: "100", height: '100%'}} variant="rectangular" animation="wave" sx={{ bgcolor: '#30303023' }}></Skeleton>}
                    <article className={styles.content}>
                        <h1 className={styles.name}>Регистрация</h1>
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
                            {regMutation.isError && <div className={styles.errorText}>Ошибка сервера</div>}
                            {repeatPasswordError && <div className={styles.errorText}>Пароли не совпадают</div>}
                            {regMutation.isSuccess && <div className={styles.successText}>Вы зарегистрировались</div>}
                        </div>
                            <div className={styles.formButton}>
                                <Button variant='contained' type="submit" sx={{background: "#454545"}} style={{width: "300px", fontSize: "12pt", fontWeight: "bold", borderRadius: "10px"}}>Зарегистрироваться</Button>
                                <div className={styles.lowerText}>
                                Есть аккаунт?  
                                <Link href="/login">Войти</Link>
                            </div>
                        </div>
                    </article>
                </div>
            </form>
        </section>
    </MountAnimation>
  )
}

export default AuthentificationForm
