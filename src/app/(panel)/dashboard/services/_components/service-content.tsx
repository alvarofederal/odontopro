import { canPermission } from '@/utils/permissions/canPermission';
import { getAllServices } from '../_data_access/get-all-services';
import { ServicesList } from './services-list';
import { permission } from 'process';

interface ServicesContentProps {
  userId: string;
}

// Simulate a delay for demonstration purposes
/*const delay = (ms: number): Promise<void> => {
    return new Promise((resolve) => {
      setTimeout(resolve, ms)
  });
};*/

export async function ServicesContent({ userId }: ServicesContentProps) {

  //await delay(1000);

  const services = await getAllServices({ userId: userId })
  const permissions = await canPermission({ type:  "service"  })

  console.log(permissions)

  return (
    <ServicesList services={services.data || []} permission={permissions}/>
  )
}