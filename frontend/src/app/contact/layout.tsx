import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Esfrar | Contact",
  description: "This is the section of get in touch with team of Esfrar",
};

export default function ContactLayout({children}:{children: React.ReactNode}){
    return <>{children}</>
}