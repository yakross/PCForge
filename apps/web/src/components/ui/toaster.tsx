'use client'

import { X } from 'lucide-react'
import { useToastStore } from '@/hooks/useToast'
import { cn } from '@/lib/utils'

export function Toaster() {
  const { toasts, remove } = useToastStore()

  return (
    <div className="fixed bottom-4 right-4 z-[100] flex flex-col gap-2 max-w-sm w-full pointer-events-none">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={cn(
            'pointer-events-auto flex items-start gap-3 rounded-xl border p-4 shadow-lg bg-background animate-in slide-in-from-right-5',
            toast.variant === 'destructive' && 'border-destructive bg-destructive/5'
          )}
        >
          <div className="flex-1">
            <p className={cn('text-sm font-semibold', toast.variant === 'destructive' && 'text-destructive')}>
              {toast.title}
            </p>
            {toast.description && (
              <p className="text-xs text-muted-foreground mt-0.5">{toast.description}</p>
            )}
          </div>
          <button onClick={() => remove(toast.id)} className="text-muted-foreground hover:text-foreground">
            <X className="h-4 w-4" />
          </button>
        </div>
      ))}
    </div>
  )
}
