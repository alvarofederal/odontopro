import getSession from '@/lib/getSession'
import prisma from '@/lib/prisma';
import { redirect } from 'next/navigation';
import { getUserData } from './_data_access/get-info-use';
import { ProfileContent } from './_components/profile';

export default async function Profile() {
    const session = await getSession()

    if (!session) {
        redirect('/')
    }

    const user = await getUserData({userId: session.user?.id})
    //console.log("getUserdata: ", user)

    if (!user) {
        redirect('/')
    }

    return (
        <ProfileContent />
    )
}