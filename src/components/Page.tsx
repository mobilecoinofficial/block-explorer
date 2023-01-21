import { ReactNode } from "react";
import Header from "components/Header";

export default function Page({ children }: { children: ReactNode }) {
    return (
        <div className="page">
            <Header />
            {children}
        </div>
    );
}
