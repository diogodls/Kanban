import { useState } from "react";
import * as C from "../../styles/CardStyles"
import { Droppable, DragDropContext, DropResult } from "react-beautiful-dnd";
import { v4 } from "uuid"
import Cards from "./Cards"

type CardType = {
    titulo: string,
    id: string,
    column: string
}

const initialState: CardType[] = []
const initialState2: CardType[] = []

export default function CardsSection(){
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
            column: 'cards'
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
        const {destination, source} = result
        if(!destination) return;

        if(destination.droppableId === source.droppableId && destination.droppableId == "coluna"){
            const [newItem] = cards.splice(source.index, 1);
            cards.splice(destination.index, 0, newItem)
            setCards(cards)
        }
        
        if(destination.droppableId === source.droppableId && destination.droppableId == "coluna2"){
            const [newItem] = cards2.splice(source.index, 1);
            cards2.splice(destination.index, 0, newItem)
            setCards2(cards2)
        }

        if(destination.droppableId !== source.droppableId){
            if(destination.droppableId == "coluna"){
                const [removed] = cards2.splice(source.index, 1);
                cards.splice(destination.index, 0, removed);
                setCards(cards);
                setCards2(cards2);
            }
            if(destination.droppableId == "coluna2"){
                const [removed] = cards.splice(source.index, 1);
                cards2.splice(destination.index, 0, removed);
                setCards2(cards2);
                setCards(cards);
            }
        }
        
    }

    return(
        <>
            <DragDropContext onDragEnd={onDragEnd}>


                <C.Input style={{marginTop: '105px'}}> 
                    <input type="text" value={title} onChange={handleTitleInput}/>

                    <div>
                        <button style={{marginLeft: '5px'}} onClick={handleAddButton}>Adicionar</button>
                    </div>
                </C.Input>

                <C.Cards>
                    
                    <C.Column>

                        <div>
                            <h2 style={{padding: '9px'}}>Coluna 1</h2>
                        </div>

                        <Droppable droppableId="coluna">
                                {(provided) => (
                                    <div ref={provided.innerRef} {...provided.droppableProps}>
                                        <Cards cards={cards} column="cards" rmCard={handleRemoveButton} />
                                        {provided.placeholder}
                                    </div>
                                )}
                        </Droppable>

                    </C.Column>

                    <C.Column>

                        <div>
                            <h2 style={{padding: '9px'}}>Coluna 2</h2>
                        </div>

                        <Droppable droppableId="coluna2">
                                {(provided) => (
                                    <div ref={provided.innerRef} {...provided.droppableProps}>
                                        <Cards cards={cards2} column="cards2" rmCard={handleRemoveButton} />
                                        {provided.placeholder}
                                    </div>
                                )}
                        </Droppable>
                        
                    </C.Column>
                    
                </C.Cards>
                
            </DragDropContext>
        </>  
    );
}