"use client"
import {store} from "@/lib/store"
import {ReactNode} from "react"
import {Provider} from "react-redux"
import {QueryClient, QueryClientProvider} from "@tanstack/react-query"
import {Toaster} from "sonner"

export function ReduxProvider({children}: {children: ReactNode}) {
  const queryClient = new QueryClient()
  return (
    <QueryClientProvider client={queryClient}>
      <Toaster
        position="top-center"
        richColors
        visibleToasts={1}
        duration={2500}
      />
      <Provider store={store()}>{children}</Provider>
    </QueryClientProvider>
  )
}
