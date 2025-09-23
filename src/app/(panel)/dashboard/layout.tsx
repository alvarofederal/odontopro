import { SidebarDashboard } from "./_components/sidebrar";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
        <SidebarDashboard>
            {children}
        </SidebarDashboard>
    </>
  )
}