// useState: tic tac toe
// http://localhost:3000/isolated/exercise/04.js

import * as React from 'react'
import {useEffect} from "react";
import {useLocalStorageState} from "../utils";

function Board({squares, selectSquare}) {
    // 🐨 squares is the state for this component. Add useState for squares
    // const squares = Array(9).fill(null)

    // const [squares, setSquares] = useLocalStorageState('tic tak toe', Array(9).fill(null))
    // 🐨 We'll need the following bits of derived state:
    // - nextValue ('X' or 'O')
    // - winner ('X', 'O', or null)
    // - status (`Winner: ${winner}`, `Scratch: Cat's game`, or `Next player: ${nextValue}`)
    // 💰 I've written the calculations for you! So you can use my utilities
    // below to create these variables
    // const nextValue = calculateNextValue(squares);
    // const winner = calculateWinner(squares);
    // const status = calculateStatus(winner, squares, nextValue);


    // This is the function your square click handler will call. `square` should
    // be an index. So if they click the center square, this will be `4`.
    // function selectSquare(square) {
    //     // 🐨 first, if there's already winner or there's already a value at the
    //     // given square index (like someone clicked a square that's already been
    //     // clicked), then return early so we don't make any state changes
    //     //
    //     // 🦉 It's typically a bad idea to mutate or directly change state in React.
    //     // Doing so can lead to subtle bugs that can easily slip into production.
    //     //
    //     // 🐨 make a copy of the squares array
    //     // 💰 `[...squares]` will do it!)
    //     //
    //     // 🐨 set the value of the square that was selected
    //     // 💰 `squaresCopy[square] = nextValue`
    //     //
    //     // 🐨 set the squares to your copy
    //
    //     if (winner || squares[square]) return;
    //
    //     const squaresCopy = [...squares];
    //     squaresCopy[square] = nextValue;
    //     setSquares(squaresCopy);
    // }

    // function restart() {
    //     // 🐨 reset the squares
    //     // 💰 `Array(9).fill(null)` will do it!
    //     setSquares(Array(9).fill(null));
    // }

    function renderSquare(i) {
        return (
            <button className="square" onClick={() => selectSquare(i)}>
                {squares[i]}
            </button>
        )
    }

    return (
        <div>
            {/* 🐨 put the status in the div below */}
            <div className="board-row">
                {renderSquare(0)}
                {renderSquare(1)}
                {renderSquare(2)}
            </div>
            <div className="board-row">
                {renderSquare(3)}
                {renderSquare(4)}
                {renderSquare(5)}
            </div>
            <div className="board-row">
                {renderSquare(6)}
                {renderSquare(7)}
                {renderSquare(8)}
            </div>
        </div>
    )
}

function Game() {
    let [story, setStory] = useLocalStorageState('tic tak toe:history', [Array(9).fill(null)])
    const [step, setStep] = useLocalStorageState('tic tak toe:myStep', 0);

    const currentBoardStatus = story[step]
    const nextValue = calculateNextValue(currentBoardStatus);
    const winner = calculateWinner(currentBoardStatus);
    const status = calculateStatus(winner, currentBoardStatus, nextValue);

    function selectSquare(square) {
        if (winner || currentBoardStatus[square]) return;

        if(step < story.length - 1) {
            story = story.slice(0, step + 1);
        }

        const lastBoardStatusCopy = [...story[story.length - 1]];
        lastBoardStatusCopy[square] = nextValue;
        const newStory = [...story, lastBoardStatusCopy];
        setStory(newStory);
        setStep(prevStep => prevStep + 1);
    }

    function renderMoveButtons(step, isCurrent) {

        const onStepBtnClick = () => setStep(step);
        const message = step === 0 ? 'game start' : `move #${step}`

        return <li key={step}>
            <button onClick={onStepBtnClick} disabled={isCurrent}>Go to {message} {isCurrent && '(current)'}</button>
        </li>
    }

    const moves = story.map((_, i) => renderMoveButtons(i, i === Number(step)));

    function restart() {
        setStory([Array(9).fill(null)]);
        setStep(0);
    }

    return (
        <div className="game">
            <div className="game-board">
                <Board squares={currentBoardStatus} selectSquare={selectSquare}/>
                <button className="restart" onClick={restart}>
                    restart
                </button>
            </div>
            <div className="game-info">
                <div>{status}</div>
                <ol>{moves}</ol>
            </div>
        </div>
    )
}

function calculateStatus(winner, squares, nextValue) {
    return winner
        ? `Winner: ${winner}`
        : squares.every(Boolean)
            ? `Scratch: Cat's game`
            : `Next player: ${nextValue}`
}

function calculateNextValue(squares) {
    return squares.filter(Boolean).length % 2 === 0 ? 'X' : 'O'
}

function calculateWinner(squares) {
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ]
    for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i]
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            return squares[a]
        }
    }
    return null
}

function App() {
    return <Game/>
}

export default App
