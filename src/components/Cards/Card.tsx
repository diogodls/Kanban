import React from "react";
import * as C from "../../styles/CardStyles"

type CardProps = {
    titulo: string
}

export default function Card(props: CardProps){

    return (
        <C.Card>
            <C.Header>
                {props.titulo}
            </C.Header>

            
        </C.Card>
    );
}