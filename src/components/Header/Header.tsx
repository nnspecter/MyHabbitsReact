"use client"; 

import styles from "./Header.module.scss";
import Link from "next/link";
import SettingsIcon from "@mui/icons-material/Settings";
import PlaylistAddCheckCircleIcon from "@mui/icons-material/PlaylistAddCheckCircle";
import AnalyticsIcon from "@mui/icons-material/Analytics";
import { usePathname } from "next/navigation";
import LogOutButton from "@/features/SettingsButtons/LogOutButton ";
import { FaTable } from "react-icons/fa6";
import { IoSettingsSharp } from "react-icons/io5";
import { IoMdAnalytics } from "react-icons/io";
import { FaList } from "react-icons/fa6";

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
                <FaList
                  style={iconStyles("/dashboard")}
                />
              </Link>
            </li>
            <li>
              <Link href="/table">
                <FaTable style={iconStyles("/table")} />
              </Link>
            </li>
            <li>
              <Link href="/analytics">
                <IoMdAnalytics style={iconStyles("/analytics")} />
              </Link>
            </li>
            <li>
              <Link href="/settings">
                <IoSettingsSharp style={iconStyles("/settings")} />
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
