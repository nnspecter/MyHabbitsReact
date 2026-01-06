import React from 'react';
import styles from './Header.module.scss';
import Link from 'next/link';
import LogOutButton from '../../features/SettingsButtons/LogOutButton ';
import SettingsIcon from '@mui/icons-material/Settings';
import TableRowsIcon from '@mui/icons-material/TableRows';
import PlaylistAddCheckCircleIcon from '@mui/icons-material/PlaylistAddCheckCircle';
const Header = () => {
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <div className={styles.logo}>
          Habits
        </div>
        <nav className={styles.nav}>
          <ul>
            <li ><Link href="/dashboard" ><PlaylistAddCheckCircleIcon/></Link></li>
            <li><Link href="/table"><TableRowsIcon/></Link></li>
            <li><Link href="/settings"><SettingsIcon/></Link></li>
            <LogOutButton/>
            
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
