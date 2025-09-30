import { getAllServices } from '../_data_access/get-all-services'
import { ServicesList } from './services-list';

interface ServiceContentProps {
    userId: string;
}

export async function ServiceContent({ userId }: ServiceContentProps) {

    // const servicos = await fetch(`http://localhost:3000/api/services?userId=${userId}`, { cache: 'no-store' })
    //     .then(res => res.json())
    //     .catch(() => null)

    const servicos = await getAllServices({ userId: userId })

    console.log('SERVIÇOS ===> ', servicos)

    return (
        <ServicesList />
    )
}