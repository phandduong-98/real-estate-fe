"use client"

import { AiFillCheckCircle } from "react-icons/ai"
import { RiErrorWarningFill } from "react-icons/ri"

import {
  Toast,
  ToastClose,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport,
} from "@/components/ui/toast"
import { useToast } from "@/components/ui/use-toast"

export function Toaster() {
  const { toasts } = useToast()

  return (
    <ToastProvider>
      {toasts.map(function ({ id, title, description, action, ...props }) {
        const variant = props.variant || "default"
        const Icon =
          variant === "destructive" ? RiErrorWarningFill : AiFillCheckCircle
        return (
          <Toast key={id} duration={3000} {...props}>
            <div className="flex space-x-3">
              <Icon size="20" className="text-white mt-0.5" />
              <div className="grid gap-1">
                {title && <ToastTitle>{title}</ToastTitle>}
                {description && (
                  <ToastDescription>{description}</ToastDescription>
                )}
              </div>
            </div>
            {action}
            <ToastClose />
          </Toast>
        )
      })}
      <ToastViewport />
    </ToastProvider>
  )
}
