import { ReactNode } from "react"
import Editor from "../Editor/Editor"

type LayoutProps = {
    children: ReactNode
}

export default function Layout({ children }: LayoutProps) {
    return(
        <div className="relative w-full h-fit">
            <Editor />
            {children}
        </div>
    )
}