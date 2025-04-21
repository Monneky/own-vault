import { prisma } from "@/lib/prisma";
import { describe } from "node:test";
import { NextRequest } from 'next/server';

describe("/api/register", () => {
    it("deberian fallar si los campos estan vacios", async () => {
        const request = new NextRequest("http://localhost/api/register", {
            method: "POST",
            body: JSON.stringify({
                email: "",
                name: "",
                password: "",
            }),
            headers: {
                "Content-Type": "application/json",
            },
        });
        const { POST } = await import('../route');
        const response = await POST(request);
        const data = await response.json();
        expect(response.status).toBe(400);
        expect(data.error).toBe(/obligatorios/i);
    });

    it('debería registrar al usuario correctamente', async () => {
        const email = `test${Date.now()}@test.com`

        const request = new NextRequest('http://localhost/api/register', {
            method: 'POST',
            body: JSON.stringify({
                email,
                name: 'Ivann Test',
                password: '12345678'
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        })

        const { POST } = await import('../route')
        const response = await POST(request)
        const data = await response.json()

        expect(response.status).toBe(200)
        expect(data.user.email).toBe(email)

        // Borra el usuario de prueba después del test
        await prisma.user.delete({ where: { email } })
    })
});
