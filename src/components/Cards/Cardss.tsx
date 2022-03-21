import { DragDropContext, Draggable, Droppable, DropResult } from "react-beautiful-dnd"
import Card from "./Card";
import * as C from "../../styles/CardStyles"
import { useState } from "react";

export default function Cards(){
    let [columns, setColumns] = useState([])
    let [cards, setCards] = useState([])
    let [index, setIndex] = useState(0)

    const onDragEnd = (result: DropResult) => {
        console.log(result)
        const { source, destination } = result;

        if(!destination) return;
        if(destination.droppableId === source.droppableId && destination.index === source.index) return;

        let add, active = cards, complete = columns;

        if(source.droppableId !== destination.droppableId && source.index !== destination.index){
            add = active[source.index];
            active.splice(source.index, 1)
        }else{
            add = complete[source.index];
            complete.splice(source.index, 1)
        }

        if(destination.droppableId !== source.droppableId && destination.index !== source.index){
            active.splice(destination.index, 0 , add)
        }else{
            complete.splice(destination.index, 0 , add)
        }

        setColumns(complete);
        setCards(active);
    }

    return (
        <DragDropContext onDragEnd={onDragEnd}>
            <C.Cards>
                <C.Column>

                    <Droppable droppableId="Column">                       
                        {(provided)=> (
                            <div ref={provided.innerRef} {...provided.droppableProps}>
                                <Draggable draggableId="card" index={index}>
                                    {(provided)=>(
                                        <>
                                            <div style={{ marginTop: '15px', }} {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef}>
                                                <Card titulo="e"/>
                                            </div>
                                        </>
                                    )}
                                </Draggable>
                                {provided.placeholder}
                                {/* <Draggable draggableId="card2" index={index+1}>
                                    {(provided)=>(
                                        <>
                                            <div style={{ marginTop: '15px', }} {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef}>
                                                <BacklogCard />
                                            </div>
                                        </>
                                    )}
                                   
                                </Draggable>
                                {provided.placeholder} */}
                            </div>
                        )} 
                    </Droppable>

                </C.Column>

                <C.Column>

                    <Droppable droppableId="Column1">                       
                        {(provided)=> (
                            <div ref={provided.innerRef} {...provided.droppableProps}>
                                {provided.placeholder}
                                <Draggable draggableId="card1" index={index+2}>
                                    {(provided)=>(
                                        <>
                                            <div style={{ marginTop: '15px', backgroundColor: 'blue'}} {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef}>
                                                <Card titulo="e"/>
                                            </div>
                                        </>
                                    )}
                                </Draggable>
                                {provided.placeholder}                                
                            </div>
                        )}
                    </Droppable>

                </C.Column>

            </C.Cards>
        </DragDropContext>
    );
}