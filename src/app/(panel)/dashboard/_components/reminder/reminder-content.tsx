"use client"

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { ReminderFormData, useReminderForm } from "./reminder-form";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

export const ReminderContent = () => {

    const form = useReminderForm();
    
    async function onSubmit(formData: ReminderFormData) {
        console.log(formData.description);
    }

    return (
        <div className="grid gap-4 py-4">
            <Form {...form}>
                <form 
                    onSubmit={form.handleSubmit(onSubmit)} 
                    className="flex flex-col gap-4">
                    <FormField  
                        control={form.control}
                        name="description"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="font-semibold">Descreva o lembrete:</FormLabel>
                                <FormControl>
                                    <Textarea 
                                        placeholder="Qual é o lembrete..." 
                                        {...field} 
                                        className="max-h-52"/>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <Button 
                        type="submit" 
                        className="w-full mt-4"
                        disabled={!form.watch("description")}>
                        Criar lembrete
                    </Button>
                </form>
            </Form>
        </div>
    );
}