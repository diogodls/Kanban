import * as N from "../../styles/NavbarStyles"
import { useNavigate } from "react-router";


export default function Navbar(){
    const navigate = useNavigate();

    function handleNewCard(){
        navigate('/new-card')
    }

    return (
        <div>
            <N.Navbar>
                <N.NavBrand>
                    Logo
                </N.NavBrand>

                <div>
                    <button onClick={handleNewCard}>Novo Card</button>
                </div>

            </N.Navbar>
        </div>
    );
}