"use server";
import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";

export async function POST(request: NextRequest) {
    try {
        const { email, name, password } = await request.json();
        if (!email || !name || !password) {
            return NextResponse.json(
                { message: "Todos los campos son obligatorios." },
                { status: 400 }
            );
        }
        const existingUser = await prisma.user.findUnique({ where: { email } });
        if (existingUser) {
            return NextResponse.json(
                { message: "El correo electrónico ya está en uso." },
                { status: 409 }
            );
        }
        const totalUser = await prisma.user.count();

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await prisma.user.create({
            data: {
                email,
                name,
                password: hashedPassword,
                role: totalUser === 0 ? "admin" : "user",
            },
        });
        return NextResponse.json({
            message: "Usuario registrado correctamente ✅",
            user: {
                id: user.id,
                email: user.email,
                name: user.name,
            },
        });
    } catch (error) {
        console.error("Error al registrar el usuario", error);
        return NextResponse.json(
            { message: "Error al registrar el usuario." },
            { status: 500 }
        );
    }
}
