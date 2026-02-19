import { redirect } from "next/navigation";

export default function Page() {
  redirect("/login");

  // Этот код никогда не рендерится
  return (
    <div>
      Redirecting to login...
    </div>
  );
}
