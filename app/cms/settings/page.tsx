import DashWrapper from "../_components/DashWrapper";
import UserInfo from "./_components/UserInfo";

export default function SettingsPage() {
  return (
    <DashWrapper>
      <div className="flex flex-col justify-center items-start w-full p-4">
        <UserInfo />
      </div>
    </DashWrapper>
  )
}