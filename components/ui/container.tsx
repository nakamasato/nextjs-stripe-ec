import * as React from "react"
import { cn } from "@/lib/utils"

const Container = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn("mx-auto max-w-7xl px-4 sm:px-6 lg:px-8", className)}
        {...props}
      />
    )
  }
)
Container.displayName = "Container"

export { Container }