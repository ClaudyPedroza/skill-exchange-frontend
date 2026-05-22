"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { FormField, FormLabel, FormMessage } from "@/components/ui/form"
import api from "@/lib/api"

export default function LoginPage() {
  const router = useRouter()
  const [serverError, setServerError] = useState("")
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm()

  const onSubmit = async ({ email, password }) => {
    setServerError("")
    try {
      const { data } = await api.post("/token/", { email, password })
      localStorage.setItem("access_token", data.access)
      localStorage.setItem("refresh_token", data.refresh)
      router.push("/dashboard")
    } catch (err) {
      const detail = err.response?.data?.detail
      setServerError(detail || "Credenciales incorrectas. Inténtalo de nuevo.")
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="w-full max-w-sm space-y-6">
        <div className="space-y-1 text-center">
          <h1 className="text-2xl font-semibold tracking-tight">Iniciar sesión</h1>
          <p className="text-sm text-muted-foreground">
            Ingresa tus credenciales para continuar
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <FormField>
            <FormLabel htmlFor="email">Email</FormLabel>
            <Input
              id="email"
              type="email"
              placeholder="tu@email.com"
              autoComplete="email"
              {...register("email", {
                required: "El email es requerido",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Ingresa un email válido",
                },
              })}
            />
            <FormMessage>{errors.email?.message}</FormMessage>
          </FormField>

          <FormField>
            <FormLabel htmlFor="password">Contraseña</FormLabel>
            <Input
              id="password"
              type="password"
              placeholder="••••••••"
              autoComplete="current-password"
              {...register("password", {
                required: "La contraseña es requerida",
              })}
            />
            <FormMessage>{errors.password?.message}</FormMessage>
          </FormField>

          {serverError && (
            <p className="text-sm font-medium text-destructive">{serverError}</p>
          )}

          <Button type="submit" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? "Iniciando sesión..." : "Iniciar sesión"}
          </Button>
        </form>

        <p className="text-center text-xs text-muted-foreground">
          ⚠️ Nota: Los tokens se guardan en localStorage solo para fines educativos.
          En producción usar httpOnly cookies.
        </p>
      </div>
    </div>
  )
}
