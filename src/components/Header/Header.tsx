import React from 'react';
import styles from './Header.module.scss';

const Header = () => {
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <div className={styles.logo}>
          MyLogo
        </div>
        <nav className={styles.nav}>
          <ul>
            <li><a href="#home">Таблица</a></li>
            <li><a href="#about">Дэшборд</a></li>
            <li><a href="#services">Настройки</a></li>
            <li><a href="#contact">Сводка</a></li>
            <li><a href="#contact">Профиль</a></li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
