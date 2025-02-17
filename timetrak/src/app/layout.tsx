import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "timeTrak",
  description: "timetracking app to improve productivity",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html>
    <head>
          
          <meta name="description" content="A time tracking app" />
          
        </head>

      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
    <SidebarProvider>
      <AppSidebar/>
      
      <main className="h-screen w-screen">
      <SidebarTrigger />
      {children}

      </main>
      
      

    </SidebarProvider>
    
    </body>
    </html>
      
  
    
  );
}
