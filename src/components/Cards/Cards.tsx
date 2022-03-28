import { HTMLAttributes } from "react";
import {Draggable } from "react-beautiful-dnd";
import Card from "./Card"

type Card = {
    titulo: string,
    id: string,
}

interface CardsProps extends HTMLAttributes<HTMLDivElement>{
    cards: Card[],
    column: string,
    rmCard: (id:string, column:string) => void;
} 

const Cards:React.FC<CardsProps> = ({cards, rmCard, column, className, ...props}) => {
    return (
        <div className={`diogo ${className}`} {...props}>
            {cards.map(({titulo, id}, index) => (
                <Draggable draggableId={id} key={id} index={index}>
                    {(provided) => (
                        <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                            <Card titulo={titulo}>
                                <button style={{position:'relative', bottom:'67px', left:'40px'}} onClick={() => {rmCard(id, column)}} >X</button>
                            </Card>
                        </div>
                    )}
                </Draggable>
            ))}
        </div>
    );
}

export default Cards;