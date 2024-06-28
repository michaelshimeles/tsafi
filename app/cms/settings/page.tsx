import { Authorization } from "@/utils/actions/authorization";
import DashWrapper from "../_components/DashWrapper";
import UserInfo from "./_components/UserInfo";
import { redirect } from "next/navigation";

export default async function SettingsPage({ params }: { params: { site_id: string } }) {
  const authCheck: any = await Authorization(params?.site_id)

  if (authCheck?.error || authCheck?.length === 0) {
    redirect("/cms")
  }
  return (
    <DashWrapper>
      <div className="flex flex-col justify-center items-start w-full p-4">
        <UserInfo />
      </div>
    </DashWrapper>
  )
}