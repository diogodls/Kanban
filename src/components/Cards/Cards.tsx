import { useState } from "react";
import Card from "./Card";
import * as C from "../../styles/CardStyles"
import { Droppable, Draggable, DragDropContext, DropResult } from "react-beautiful-dnd";

const initialCards = [
    {
        titulo: 'Primeiro',
        id: "1"
    },
    {
        titulo: 'Segundo',
        id: "2"
    },
    {
        titulo: 'Terceiro',
        id: "3"
    },
    {
        titulo: 'Quarto',
        id: "4"
    }
]

const initialCards2= [ 
    {
        titulo: 'Quinto',
        id: "5"
    },
    {
        titulo: 'Sexto',
        id: "6"
    },
    {
        titulo: 'Sétimo',
        id: "7"
    },
    {
        titulo: 'Oitavo',
        id: "8"
    },
]

export default function Cards(){
    const [cards, setCards] = useState(initialCards)
    const [cards2, setCards2] = useState(initialCards2)

    const onDragEnd = (result: DropResult) => {
        console.log(result)
        const {destination, source} = result
        if(!destination) return;

        if(destination.droppableId === source.droppableId && destination.droppableId == "coluna"){
            const items = Array.from(cards);
            const [newItem] = items.splice(source.index, 1);
            items.splice(destination.index, 0, newItem)
            setCards(items)
        }
        
        if(destination.droppableId === source.droppableId && destination.droppableId == "coluna2"){
            const items = Array.from(cards2);
            const [newItem] = items.splice(source.index, 1);
            items.splice(destination.index, 0, newItem)
            setCards2(items)
        }

        if(destination.droppableId != source.droppableId){
            if(destination.droppableId == "coluna"){
                const itemDest = Array.from(cards);
                const itemSourc = Array.from(cards2);
                const [removed] = itemSourc.splice(source.index, 1);
                itemDest.splice(destination.index, 0, removed);
                setCards(itemDest);
                setCards2(itemSourc);
            }
            if(destination.droppableId == "coluna2"){
                const itemDest = Array.from(cards2);
                const itemSourc = Array.from(cards);
                const [removed] = itemSourc.splice(source.index, 1);
                itemDest.splice(destination.index, 0, removed);
                setCards2(itemDest);
                setCards(itemSourc);
            }
        }
        
    }

    return(
        <div>
            <DragDropContext onDragEnd={onDragEnd}>

                <C.Cards>
                    
                    <C.Column>
                        <Droppable droppableId="coluna">
                                {(provided) => (
                                    <div {...provided.droppableProps} ref={provided.innerRef}>
                                        {cards.map(({titulo, id}, index) => (
                                            <Draggable draggableId={id} key={id} index={index}>
                                                {(provided) => (
                                                    <div {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef}>
                                                        <Card titulo={titulo} ></Card>
                                                    </div>
                                                )}
                                            </Draggable>
                                        ))}
                                        {provided.placeholder}
                                    </div>
                                )}
                        </Droppable>
                    </C.Column>

                    <C.Column>
                        <Droppable droppableId="coluna2">
                                {(provided) => (
                                    <div {...provided.droppableProps} ref={provided.innerRef}>
                                        {cards2.map(({titulo, id}, index) => (
                                            <Draggable draggableId={id} key={id} index={index}>
                                                {(provided) => (
                                                    <div {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef}>
                                                        <Card titulo={titulo} ></Card>
                                                    </div>
                                                )}
                                            </Draggable>
                                        ))}
                                        {provided.placeholder}
                                    </div>
                                )}
                        </Droppable>
                    </C.Column>
                    
                </C.Cards>
                
            </DragDropContext>
        </div>  
    );
}