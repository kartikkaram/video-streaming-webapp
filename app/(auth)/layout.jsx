import { Logo } from "./_component/Logo";



export default function AuthLayout({children}){
    return(
        <div className="h-screen w-screen flex flex-col justify-center items-center gap-4">
            <Logo />
        {children}
        </div>
    )
}