import getSession from '@/lib/getSession'
import prisma from '@/lib/prisma';
import { redirect } from 'next/navigation';
import { getUserData } from './_data_access/get-info-use';

export default async function Profile() {
    const session = await getSession()

    if (!session) {
        redirect('/')
    }

    const user = await getUserData({userId: session.user?.id})
    console.log("getUserdata: ", user)

    if (!user) {
        redirect('/')
    }

    return (
        <section>
            <h1>Página de Perfil</h1>
            
            <div className="w-full h-[600px] bg-gray-200 mb-10"></div>
            <div className="w-full h-[600px] bg-gray-500 mb-10"></div>
            <div className="w-full h-[600px] bg-gray-200 mb-10"></div>            
        </section>
    )
}