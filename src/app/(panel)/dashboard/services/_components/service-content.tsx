import { getAllServices } from '../_data_access/get-all-services';
import { ServicesList } from './services-list';

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

  return (
    <ServicesList services={services.data || []}/>
  )
}