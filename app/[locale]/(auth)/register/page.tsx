import { redirect } from "next/navigation";
import RegisterForm from "@/components/register-form/RegisterForm";
import { getSession } from "next-auth/react";

export default async function RegisterPage() {
  const session = await getSession();
  if (session) {
    redirect("/");
  }

  return <RegisterForm />;
}
