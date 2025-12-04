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
            <li><Link href="/table">Таблица</Link></li>
            <li><Link href="/dashboard">Дэшборд</Link></li>
            <li><Link href="/settings">Настройки</Link></li>
            <li><Link href="#contact">Сводка</Link></li>
            <li><Link href="#contact">Профиль</Link></li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
