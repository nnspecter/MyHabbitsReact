"use client"; 

import styles from "./Header.module.scss";
import Link from "next/link";
import SettingsIcon from "@mui/icons-material/Settings";
import TableRowsIcon from "@mui/icons-material/TableRows";
import PlaylistAddCheckCircleIcon from "@mui/icons-material/PlaylistAddCheckCircle";
import AnalyticsIcon from "@mui/icons-material/Analytics";
import { usePathname } from "next/navigation";
import LogOutButton from "@/features/SettingsButtons/LogOutButton ";
import { hover } from "framer-motion";



const Header = () => {
  const pathname = usePathname(); // Ааааа это же NEXT.js хук для клиентских компонентов
  const hideHeaderPaths = ["/dashboard", "/settings", "/table", "/analytics"];
  const showHeader = hideHeaderPaths.includes(pathname);
  if (!showHeader) return null;
  const iconStyles = (path: string) => {
    return { 
      fontSize: "var(--headerFontSize)",
      color: pathname == path && "var(--selectedColor)",
      transition: "color 0.2s ease"}
  }
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <h1 className={styles.logo}>Habits</h1>
        <nav className={styles.nav}>
          <ul>
            <li>
              <Link href="/dashboard">
                <PlaylistAddCheckCircleIcon
                  style={iconStyles("/dashboard")}
                />
              </Link>
            </li>
            <li>
              <Link href="/table">
                <TableRowsIcon style={iconStyles("/table")} />
              </Link>
            </li>
            <li>
              <Link href="/settings">
                <SettingsIcon style={iconStyles("/settings")} />
              </Link>
            </li>
            <li>
              <Link href="/analytics">
                <AnalyticsIcon style={iconStyles("/analytics")} />
              </Link>
            </li>
            <LogOutButton />
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
