"use client";

import { useRouter } from "next/navigation";
import { SettingsStyledButton } from "@/features/muiThemes/SettingsStyledButton";
import { MountAnimation } from "@/animations/MountAnimation";

export default function NotFoundClient() {
  const router = useRouter();

  return (
    <MountAnimation key={"notFoundPage"}>
      <div className="container" style={{ alignItems: "center" }}>
        <p className="medFont1">
          Ошибка 404 — Страница не найдена
        </p>

        <SettingsStyledButton onClick={() => router.push("/table")} sx={{background: "#454545", color: "#fff"  }}>
          На главную
        </SettingsStyledButton>
      </div>
    </MountAnimation>
  );
}
