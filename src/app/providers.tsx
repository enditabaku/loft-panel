"use client";
import { ThemeProvider } from "next-themes";
import RoleProvider from "@/providers/RoleProvider";
import AuthProvider from "@/providers/AuthProvider";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider defaultTheme="light" attribute="class">
          <RoleProvider>
            <AuthProvider>
              {children}
            </AuthProvider>
          </RoleProvider>
    </ThemeProvider>
  );
}
