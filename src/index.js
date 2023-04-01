import React, {useState} from 'react';
import ReactDOM from 'react-dom';
import './index.css';


const Square = (props) => { //square component
//const [value, setValue] = useState(null); //state hook
  return (
    <button 
    className='square'
    onClick={props.onClickEvent}> 
      {props.value}
    </button>
  );
};

const Board = () => { //board component
  const initialSquares = Array(9).fill(null);
  const [squares,setSquares]= useState(initialSquares); 
  const [xIsNext, setXIsNext] = useState(true); 

  const handleClickEvent = (i) => { // make a copy of the squares state array
    
    const newSquares = [...squares]; // mutate the copy, set the ith elt to X
   
    const winnerDeclared = Boolean(calculateWinner(newSquares)); //if winner is declared then no more moves can be made.
    
   const squareFilled = Boolean(newSquares[i]); //if square is filled then no more moves can be made.
    
    if(winnerDeclared || squareFilled)
    {
      return; //return if winner is declared or square is filled.
    }

    newSquares[i] = xIsNext ? 'X' : 'O'; // call the setsquares function to update the state
  
    setSquares(newSquares);
    setXIsNext(!xIsNext); //alternate turns
};
const renderSquare = (i) => {
  return (
  <Square 
  value={squares[i]}
  onClickEvent={() => handleClickEvent(i)}
  />
  );
};

const winner = calculateWinner(squares); //checking for winner after every move.
const status = winner ?
`Winner: ${winner}` :
`Next player: ${xIsNext ? 'X' : 'O'}`; //ternary operator.
//if next player is X then X will e placed otherwise O will be placed.

  return (
    <div>
      <div className='status'>{status}</div> 
      Board
       <div className='board-row'>
       {renderSquare(0)}{renderSquare(1)}{renderSquare(2)}
       </div>
       <div className='board-row'>
       {renderSquare(3)}{renderSquare(4)}{renderSquare(5)}
       </div>
       <div className='board-row'>
        {renderSquare(6)}{renderSquare(7)}{renderSquare(8)}
       </div>
    </div>
  );
};

const Game =() => { //game component
  return (
    <div className="game">
      Tic-Tac-Toe Game
      <Board/>
    </div>
  );
};

ReactDOM.render(<Game />, document.getElementById('root')); //rendering the game component

function calculateWinner(squares){ //function to calculate winner
  const lines = [
    [0,1,2], 
    [3,4,5],
    [6,7,8],
    //rows till here
    [0,3,6],
    [1,4,7],
    [2,5,8],
    //columns till here
    [0,4,8],
    [2,4,6],
    //diagonals till here
  ];
  for(let line of lines) //looping through the lines array
  {
    const [a,b,c] = line;
    if(squares[a] && squares[a] === squares[b] && squares[a] === squares[c])
    {
      return squares[a]; //X or O
    }
  }
  return null;
}