import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { error } from "console";
import { NextRequest, NextResponse } from "next/server";

export const GET = auth(async function GET(request) {

    if (!request.auth) {
        return NextResponse.json({
            error: "Acesso não autorizado!"
        }, { 
            status: 401 
        })
    }

    const searchParams = request.nextUrl.searchParams;
    const dateString = searchParams.get("date") as string;
    const clinicId = request.auth?.user?.id;

    if (!dateString) {
        return NextResponse.json({ error: "Data é obrigatória!"}, {  status: 400 })
    }

    if (!clinicId) {
        return NextResponse.json({ error: "Usuário não encontrado"}, { status: 400 })
    }

    try {
        const [year, month, day] = dateString.split("-").map(Number);
        const startDate = new Date(year, month - 1, day, 0, 0, 0, 0);
        const endDate = new Date(year, month - 1, day, 23, 59, 59, 999);

        const appointments = await prisma.apointment.findMany({
            where: {
                userId: clinicId,
                apointmentDate: {
                    gte: startDate,
                    lte: endDate
                }
            },
            include: {
                service: true
            },
            orderBy: {
                apointmentDate: "asc"
            }
        })
        return NextResponse.json(appointments)
    } catch (error) {
        return NextResponse.json({ error: "Falha ao buscar agendamentos!"}, { status: 500 })
    }
})