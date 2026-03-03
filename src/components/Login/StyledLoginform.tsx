"use client"
import styles from "./StyledLoginForm.module.scss"
import { Button, Skeleton} from '@mui/material'
import { useRouter } from 'next/navigation';
import Link from "next/link";
import { MountAnimation } from "@/animations/MountAnimation";
import { useLogin } from "@/entities/api/mutations/mutations";
import { useEffect } from "react";
import { CssTextField } from "@/shared/customComponents/LoginField";



const AuthentificationForm = () => {
  const router = useRouter();
  const loginMutation = useLogin();

  
  useEffect (()=>{
    if(!loginMutation.isSuccess) return;
    router.push("/table"); 
  },[loginMutation.isSuccess])

  const handleSubmit = (e:React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
          const form = e.currentTarget;
          const username = (form.elements.namedItem('login-input') as HTMLInputElement).value.trim();
          const password = (form.elements.namedItem('password-input') as HTMLInputElement).value.trim();
      if (!username || !password) {
          return;
      }
      loginMutation.mutate({ username, password });
  } 

  return (

    <MountAnimation key={"login"}>
      <section className={styles.form}>
        <form onSubmit ={handleSubmit}>
          <div className={styles.formPanel}>
            {loginMutation.isPending && <Skeleton style={{position: "absolute", inset: "0", zIndex: "100", height: '100%'}} variant="rectangular" animation="wave" sx={{ bgcolor: '#30303023' }}></Skeleton>}
            <article className={styles.content}>
              <h1 className={styles.name}>Вход</h1>
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
                {loginMutation.isError && <div className={styles.errorText}>Введены неверные данные</div>}
              </div>
              <div className={styles.formButton}>
                <Button variant='contained' type="submit"  style={{width: "300px", fontSize: "12pt", fontWeight: "bold", borderRadius: "10px"}}>Войти</Button>
                <div className={styles.lowerText}>
                  Нет аккаунта? 
                  <Link href="/registration">Зарегистрироваться</Link>
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
