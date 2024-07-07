"use client"
import PageWrapper from "@/components/container/page-wrapper";
import { UserProfile } from "@clerk/nextjs";


const UserProfilePage = () => {
    return (
        <PageWrapper>
            <div className="h-full flex items-center justify-center p-9 mt-[6rem]">
                <UserProfile path="/user-profile" routing="path" />
            </div>
        </PageWrapper>
    )
}


export default UserProfilePage;