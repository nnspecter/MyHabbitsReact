import React from 'react';
import styles from './Header.module.scss';
import Link from 'next/link';

const Header = () => {
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <div className={styles.logo}>
          Habits
        </div>
        <nav className={styles.nav}>
          <ul>
            <li><Link href="/MyHabbitsReact/table">Таблица</Link></li>
            <li><Link href="/MyHabbitsReact/dashboard">Дэшборд</Link></li>
            <li><Link href="/MyHabbitsReact/settings">Настройки</Link></li>
            <li><Link href="#contact">Сводка</Link></li>
            <li><Link href="#contact">Профиль</Link></li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
