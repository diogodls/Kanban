import {Draggable } from "react-beautiful-dnd";
import Card from "./Card"

type CardsProps = {
    cards[
        {titulo: string, id: string}
    ]
}

export default function Cards({cards}: CardsProps){
    return (
        <div>
            {cards.map(({titulo, id}, index) => (
                <Draggable draggableId={id} key={id} index={index}>
                    {(provided) => (
                        <div {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef}>
                            <Card titulo={titulo} >
                                <button style={{position:'relative', bottom:'67px', left:'40px'}} onClick={() => handleRemoveButton(id, 'cards')}>X</button>
                            </Card>
                        </div>
                    )}
                </Draggable>
            ))}
        </div>
    );
}