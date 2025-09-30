"use client"

import { DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { DialogContent, DialogDescription } from "@radix-ui/react-dialog"

export function DialogService() {
    return (
        <>
            <DialogHeader>
                <DialogTitle>Adicionar Serviço</DialogTitle>
                <DialogDescription>
                    Adicione um novo serviço
                </DialogDescription>
            </DialogHeader>

            <div>
                <h1>
                    CONTEÚDO DO MODAL
                </h1>
            </div>
        </>
    )
}