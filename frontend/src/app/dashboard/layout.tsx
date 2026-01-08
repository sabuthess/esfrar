import { Metadata } from "next";

export const metadata: Metadata ={
    title:"Esfrar | Learn about esfrar and his team", 
    description: ""
}

export default function DashboardLayout({children}:{children: React.ReactNode}){
    return <>{children}</>
}