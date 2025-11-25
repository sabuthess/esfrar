import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Esfrar | FQA",
  description: "This is the section of get in touch with team of Esfrar",
};

export default function FqaLayout({children}:{children: React.ReactNode}){
    return <>{children}</>
}