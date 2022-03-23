import { useState } from "react";
import Card from "./Card";
import * as C from "../../styles/CardStyles"
import { Droppable, Draggable, DragDropContext, DropResult } from "react-beautiful-dnd";
import { v4 } from "uuid"

type CardsType = {
    titulo: string,
    id: string,
    column: number
}

const initialState: CardsType[] = []
const initialState2: CardsType[] = []

export default function Cards(){
    let [cards, setCards] = useState(initialState)
    const [cards2, setCards2] = useState(initialState2)
    const [title, setTitle] = useState('');

    function handleTitleInput(e: React.ChangeEvent<HTMLInputElement>){
        setTitle(e.target.value)
    }

    function handleAddButton(){
        if(!title) return;
        cards.push({
            titulo: title,
            id: v4(),
            column: 1
        });
        setTitle('');
        setCards(cards);
    }

    function handleRemoveButton(id:string, column:string){
        if(!id) return;

        if(column == 'cards'){
            setCards(cards.filter(item => item.id != id));
        }else{
            setCards2(cards2.filter(item => item.id != id));
        }
    }
    

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
                        <div><h2>Coluna 1</h2></div>
                        <Droppable droppableId="coluna">
                                {(provided) => (
                                    <div {...provided.droppableProps} ref={provided.innerRef}>
                                        {cards.map(({titulo, id}, index) => (
                                            <Draggable draggableId={id} key={id} index={index}>
                                                {(provided) => (
                                                    <div {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef}>
                                                        <Card titulo={titulo} >
                                                            <button onClick={() => handleRemoveButton(id, 'cards')}>Remover</button>
                                                        </Card>
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
                        <div><h2>Coluna 2</h2></div>
                        <Droppable droppableId="coluna2">
                                {(provided) => (
                                    <div {...provided.droppableProps} ref={provided.innerRef}>
                                        {cards2.map(({titulo, id, column}, index) => (
                                            <Draggable draggableId={id} key={id} index={index}>
                                                {(provided) => (
                                                    <div {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef}>
                                                        <Card titulo={titulo} >
                                                            <p><button onClick={() => handleRemoveButton(id, 'cards2')}>Remover</button></p>
                                                        </Card>
                                                    </div>
                                                )}
                                            </Draggable>
                                        ))}
                                        {provided.placeholder}
                                    </div>
                                )}
                        </Droppable>
                    </C.Column>
                    
                    <div> 
                        <input type="text" value={title} onChange={handleTitleInput}/>

                        <div>
                            <button onClick={handleAddButton}>Adicionar</button>
                        </div>

                    </div>

                </C.Cards>
                
            </DragDropContext>
        </div>  
    );
}