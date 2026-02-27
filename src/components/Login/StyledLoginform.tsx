"use client"
import styles from "./StyledLoginForm.module.scss"
import { Button} from '@mui/material'
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

  const handleSubmit = (username: string, password: string) => {

      if (!username || !password) {
          return;
      }
      loginMutation.mutate({ username, password });
  } 

  return (
    <MountAnimation key={"login"}>
      <section className={styles.form}>
        <form onSubmit ={(e:React.FormEvent<HTMLFormElement>) => {
          e.preventDefault();
          const form = e.currentTarget;
          const login = (form.elements.namedItem('login-input') as HTMLInputElement).value.trim();
          const password = (form.elements.namedItem('password-input') as HTMLInputElement).value.trim();
          handleSubmit(login, password);
        }}>
          <div className={styles.formPanel}>
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
          </div>
        </form>
      </section>
    </MountAnimation>
  )
}

export default AuthentificationForm
