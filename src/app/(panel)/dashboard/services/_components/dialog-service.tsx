"use client"

import { DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { DialogContent, DialogDescription } from "@radix-ui/react-dialog"
import { useDialogServiceForm, DialogServiceFormData } from "./dialog-service-form";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {convertRealToCents} from "@/utils/convertCurrency";

export function DialogService() {

    const form = useDialogServiceForm();

  async function onSubmit(values: DialogServiceFormData) {

    const priceInCents = convertRealToCents(values.price)

    console.log(priceInCents)
  }


  function changeCurrency(event: React.ChangeEvent<HTMLInputElement>) {
    let { value } = event.target;
    value = value.replace(/\D/g, '');

    if (value) {
      value = (parseInt(value, 10) / 100).toFixed(2);
      value = value.replace('.', ',');
      value = value.replace(/\B(?=(\d{3})+(?!\d))/g, '.')
    }

    event.target.value = value;
    form.setValue("price", value)

  }

    return (
        <>
            <DialogHeader>
                <DialogTitle className="font-bold">Novo Serviço</DialogTitle>
                <DialogDescription>
                    Adicione um novo serviço
                </DialogDescription>
            </DialogHeader>

            <Form {...form}>
                <form 
                    className="space-y-4"
                    onSubmit={form.handleSubmit(onSubmit)}>
                    <div className="flex flex-col">
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem className="my-4">
                                    <FormLabel className="font-bold">
                                        Nome do Serviço:
                                    </FormLabel>
                                    <FormControl>
                                        <Input placeholder="Ex: Consulta" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                        control={form.control}
                        name="price"
                        render={({ field }) => (
                            <FormItem className="my-2">
                            <FormLabel className="font-semibold">
                                Valor do serviço:
                            </FormLabel>
                            <FormControl>
                                <Input
                                {...field}
                                placeholder="Ex: 120,00"
                                onChange={changeCurrency}
                                />
                            </FormControl>
                            <FormMessage />
                            </FormItem>
                        )}
                        />
                    </div>

                    <p className="font-semibold">Tempo de duação do serviço:</p>
                    <div className="grid grid-cols-2 gap-3">
                        <FormField
                            control={form.control}
                            name="hours"
                            render={({ field }) => (
                                <FormItem className="my-2">
                                    <FormLabel className="font-bold">
                                        Horas:
                                    </FormLabel>
                                    <FormControl>
                                        <Input 
                                            placeholder="1" 
                                            {...field} 
                                            type="number" 
                                            min="0" 
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="minutes"
                            render={({ field }) => (
                                <FormItem className="my-2">
                                    <FormLabel className="font-bold">
                                        Minutos:
                                    </FormLabel>
                                    <FormControl>
                                        <Input 
                                            placeholder="0" 
                                            {...field} 
                                            type="number" 
                                            min="0" 
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                    <Button type="submit" className="w-full font-bold text-white">
                        Adicionar Serviço
                    </Button>
                </form>
            </Form>
        </>
    )
}