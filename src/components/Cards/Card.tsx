import React, { Children, ReactNode } from "react";
import * as C from "../../styles/CardStyles"

type CardProps = {
    titulo: string,
    children: ReactNode
}

export default function Card({titulo, children}: CardProps){

    return (
        <C.Card>
            <C.Header>
                <div>
                    {titulo}
                </div>
            </C.Header>
            {children}
        </C.Card>
    );
}