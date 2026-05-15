import { create } from 'zustand'

interface Toast {
  id: string
  title: string
  description?: string
  variant?: 'default' | 'destructive'
}

interface ToastStore {
  toasts: Toast[]
  add: (toast: Omit<Toast, 'id'>) => void
  remove: (id: string) => void
}

const useToastStore = create<ToastStore>((set) => ({
  toasts: [],
  add: (toast) => {
    const id = Math.random().toString(36).slice(2)
    set((s) => ({ toasts: [...s.toasts, { ...toast, id }] }))
    setTimeout(() => set((s) => ({ toasts: s.toasts.filter((t) => t.id !== id) })), 4000)
  },
  remove: (id) => set((s) => ({ toasts: s.toasts.filter((t) => t.id !== id) })),
}))

export function useToast() {
  const { add } = useToastStore()
  return { toast: add, toasts: useToastStore((s) => s.toasts) }
}

export { useToastStore }
