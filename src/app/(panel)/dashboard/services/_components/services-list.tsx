"use client"
import { useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Button } from '@/components/ui/button'
import { Pencil, Plus, X } from 'lucide-react'
import { DialogService } from './dialog-service'
import { Service } from '@/generated/prisma'
import { formatCurrency } from '@/utils/formatCurrency'
import { deleteService } from '../_actions/delete-service'
import { toast } from 'sonner'

interface ServicesListProps {
  services: Service[]
}

export function ServicesList({ services }: ServicesListProps) {

  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingService, setEditingService] = useState<Service | null>(null)

  async function handleUpdateService(service: Service) {
    setEditingService(service);
    setIsDialogOpen(true);
  }

  async function handleDeleteService(serviceId: string) {
    const respondse = await deleteService({ serviceId: serviceId })

    if (respondse.error) {
      toast.error(respondse.error)
      return;
    }

    toast.success('Serviço deletado com sucesso')
  }

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <section className='mx-auto'>
        <Card>
          <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
            <CardTitle className='text-xl md:text-2xl font-bold'>Serviços</CardTitle>
            <DialogTrigger asChild>
              <Button>
                <Plus className='w-4 h-4' />
              </Button>
            </DialogTrigger>

            <DialogContent
              onInteractOutside={ (e) => {
                e.preventDefault();
                setIsDialogOpen(false);
                setEditingService(null);
              }}>
              <DialogService 
                closeModal={
                  () => {
                    setIsDialogOpen(false);
                    setEditingService(null);
                  }
                }
                serviceId={editingService ? editingService.id : undefined}
                initialValues={editingService ?{
                  name: editingService.name,
                  price: (editingService.price / 100).toFixed(2).replace('.', ','),
                  hours: Math.floor(editingService.duration / 60).toString(),
                  minutes: (editingService.duration % 60).toString(),
                } : undefined}
                />
            </DialogContent>
          </CardHeader>

          <CardContent>
            <section className='mt-10'>
              <Table >
                <TableHeader>
                  <TableRow>
                    <TableHead className='font-bold'>Serviço</TableHead>
                    <TableHead className="font-bold">Valor</TableHead>
                    <TableHead className="text-right font-bold">Ações</TableHead>
                  </TableRow>
                </TableHeader>
                {services.map((service) => (
                  <TableBody>
                    <TableRow>
                      <TableCell>{service.name}</TableCell>
                      <TableCell>{formatCurrency(service.price / 100)}</TableCell>
                      <TableCell className="text-right">
                        <Button
                          variant="ghost"
                          size={"icon"}
                          onClick={() => handleUpdateService(service)}>
                          <Pencil className='w-4 h-4' />
                        </Button>
                        <Button
                          variant="ghost"
                          size={"icon"}
                          onClick={() => handleDeleteService(service.id.toString())}>
                          <X className='w-4 h-4' />
                        </Button>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                ))}
              </Table>
            </section>
          </CardContent>
        </Card>
      </section>
    </Dialog>
  )
}