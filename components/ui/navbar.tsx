import * as React from "react"
import { cn } from "@/lib/utils"

const Navbar = React.forwardRef<HTMLElement, React.HTMLAttributes<HTMLElement>>(
  ({ className, ...props }, ref) => {
    return (
      <nav
        ref={ref}
        className={cn(
          "sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60",
          className
        )}
        {...props}
      />
    )
  }
)
Navbar.displayName = "Navbar"

const NavbarContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn("flex h-14 items-center justify-between", className)}
        {...props}
      />
    )
  }
)
NavbarContent.displayName = "NavbarContent"

const NavbarBrand = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn("flex items-center space-x-2", className)}
        {...props}
      />
    )
  }
)
NavbarBrand.displayName = "NavbarBrand"

const NavbarNav = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn("flex items-center space-x-4", className)}
        {...props}
      />
    )
  }
)
NavbarNav.displayName = "NavbarNav"

export { Navbar, NavbarContent, NavbarBrand, NavbarNav }