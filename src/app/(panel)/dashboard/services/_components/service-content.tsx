import { canPermission } from '@/utils/permissions/canPermission';
import { getAllServices } from '../_data_access/get-all-services';
import { ServicesList } from './services-list';
import { permission } from 'process';
import { LabelSubscription } from '@/components/ui/label-subscription';

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
    <>
      {permissions.planId === "TRIAL" && (
        <div className="bg-green-600 text-white text-sm md:text-base px-3 py-2 my-4 rounded-md flex flex-col md:flex-row md:items-center justify-between gap-1">
            <div>
                <h3 className="font-semibold">
                    Você está no período de teste gratuito!
                </h3>
                <p className="text-sm text-gray-50">
                    Aproveite para conhecer todas as funcionalidades!
                </p>
            </div>
        </div>
      )}

      {!permissions.hasPermission && (
          <LabelSubscription permission={permissions} />
      )}
      <ServicesList services={services.data || []} permission={permissions}/>  
    </>
    
  )
}