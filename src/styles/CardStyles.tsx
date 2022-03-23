import styled from "styled-components";

export const Card = styled.div`
    display: flex;
    flex-flow: column;
    justify-content: center;
    align-items: center;
    background-color: lightslategray;
    padding: 20px;
    width: auto;
    border-radius: 4px;
`

export const Header = styled.header`
    font-size: 16px;
    font-weight: bold;
    padding: 20px 15px 10px;
    background-color: #cccccc;
    color: black;
    border-radius: 4px;
    cursor: pointer;
`

export const Cards = styled.section`
    display: flex;
    flex-flow: row;
    margin: 105px 15px;
`

export const Column = styled.div`
    display: flex;
    flex-flow: column; 
    align-items: center;
    margin-left: 15px;
    background-color: lightblue;
`
