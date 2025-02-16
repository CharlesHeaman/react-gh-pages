import { ReactNode } from "react";
import { UserProvider } from "./auth";
import { ExportProvider } from "./export";

const AppProvider = (props: { 
    children: ReactNode
}) => {
    return (
        <UserProvider>
            <ExportProvider>
                {props.children}
            </ExportProvider>
        </UserProvider>
    )
}

export default AppProvider