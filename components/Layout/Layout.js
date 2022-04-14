import Editor from "../Editor/Editor"

export default function Layout({ children }) {
    return(
        <div className="relative w-full h-fit">
            <Editor />
            {children}
        </div>
    )
}