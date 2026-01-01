import React from 'react';
import styles from './Header.module.scss';
import Link from 'next/link';
import LogOutButton from '../../features/SettingsButtons/LogOutButton ';

const Header = () => {
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <div className={styles.logo}>
          <div className='medFont2'>Habits</div> 
        </div>
        <nav className={styles.nav}>
          <ul>
            <li ><Link href="/dashboard" >Записи</Link></li>
            <li><Link href="/table">Превью</Link></li>
            <li><Link href="/settings">Настройки</Link></li>
            <LogOutButton/>
            
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
