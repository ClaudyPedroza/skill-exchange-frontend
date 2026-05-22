"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"

export default function Home() {
  const router = useRouter()

  useEffect(() => {
    if (localStorage.getItem("access_token")) {
      router.replace("/dashboard")
    }
  }, [router])

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="text-center space-y-4">
        <h1 className="text-3xl font-bold tracking-tight">Skill Exchange</h1>
        <p className="text-muted-foreground">Plataforma de intercambio de habilidades</p>
        <Button onClick={() => router.push("/login")}>Inicia sesión</Button>
      </div>
    </div>
  )
}
