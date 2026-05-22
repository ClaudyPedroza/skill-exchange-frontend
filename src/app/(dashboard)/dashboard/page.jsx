"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import api from "@/lib/api"

export default function DashboardPage() {
  const router = useRouter()
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    api
      .get("/users/me/")
      .then(({ data }) => setUser(data))
      .catch(() => {
        localStorage.removeItem("access_token")
        localStorage.removeItem("refresh_token")
        router.replace("/login")
      })
      .finally(() => setLoading(false))
  }, [router])

  if (loading) {
    return (
      <main className="flex-1 p-6">
        <p className="text-sm text-muted-foreground">Cargando...</p>
      </main>
    )
  }

  return (
    <main className="flex-1 p-6 space-y-4">
      <h2 className="text-xl font-semibold">
        Bienvenido{user?.first_name ? `, ${user.first_name}` : ""}
      </h2>
      {user && (
        <div className="rounded-lg border p-4 space-y-2 text-sm max-w-sm">
          {(user.first_name || user.last_name) && (
            <p>
              <span className="font-medium">Nombre:</span>{" "}
              {[user.first_name, user.last_name].filter(Boolean).join(" ")}
            </p>
          )}
          {user.email && (
            <p>
              <span className="font-medium">Email:</span> {user.email}
            </p>
          )}
          {user.profile?.headline && (
            <p>
              <span className="font-medium">Headline:</span> {user.profile.headline}
            </p>
          )}
          {user.profile?.location && (
            <p>
              <span className="font-medium">Ubicación:</span> {user.profile.location}
            </p>
          )}
        </div>
      )}
    </main>
  )
}
