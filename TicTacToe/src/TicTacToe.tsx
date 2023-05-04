import { useEffect, useState } from 'react';
import './TicTacToe.css';

export const TicTacToe: React.FunctionComponent = () => {
    const [board, setBoard] = useState<Array<string>>([
        "", "", "",
        "", "", "",
        "", "", "",
    ]);
    const [turn, setTurn] = useState('X');
    const [winner, setWinner] = useState('');
    const boardtableClassName = `board-${turn.toLowerCase()}`;
    const clearBoard = () => {
        setBoard([
            "", "", "",
            "", "", "",
            "", "", "",
        ]);
        setTurn('X');
        setWinner('');
        const buttons = document.querySelectorAll('.board-button');
        buttons.forEach(button => button.classList.remove('winning-button'));
    }

    function handleClick(index: number) {
        if (board[index] || winner) return;
        const newBoard = Array.from(board);
        newBoard[index] = turn;
        setBoard(newBoard);
        setTurn(turn === 'X' ? 'O' : 'X');
        checkWinner(newBoard);
    }

    function checkWinner(currentBoard: string[]) {
        const possibleWins = [[0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
        ];

        possibleWins.forEach(win => {
            const [a, b, c] = win;
            if (currentBoard[a] && currentBoard[a] === currentBoard[b] && currentBoard[a] === currentBoard[c]) {
                setWinner(currentBoard[a]);
            }
        });
    }

    useEffect(() => {
        if (winner) {
            const possibleWins = [[0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6]
            ];

            possibleWins.forEach(win => {
                const [a, b, c] = win;
                if (board[a] === winner && board[b] === winner && board[c] === winner) {
                    const winningButtons = Array.from(document.querySelectorAll(`#b${a + 1}, #b${b + 1}, #b${c + 1}`));
                    winningButtons.forEach(button => button.classList.add('winning-button'));
                }
            });
        }
    }, [winner]);




    return (
        <div id="board" className="board">
            <h1>TIC TAC TOE</h1>
            <div className={boardtableClassName}>
                <div className="board-rows">
                    <button id="b1" className={`board-button ${board[0] ? board[0].toLowerCase() : 'board-button'}`}
                        onClick={() => handleClick(0)}>{board[0]}</button>
                    <button id="b2" className={`board-button ${board[1] ? board[1].toLowerCase() : 'board-button'}`}
                        onClick={() => handleClick(1)}>{board[1]}</button>
                    <button id="b3" className={`board-button ${board[2] ? board[2].toLowerCase() : 'board-button'}`}
                        onClick={() => handleClick(2)}>{board[2]}</button>
                </div>
                <div className="board-rows">
                    <button id="b4" className={`board-button ${board[3] ? board[3].toLowerCase() : 'board-button'}`}
                        onClick={() => handleClick(3)}>{board[3]}</button>
                    <button id="b5" className={`board-button ${board[4] ? board[4].toLowerCase() : 'board-button'}`}
                        onClick={() => handleClick(4)}>{board[4]}</button>
                    <button id="b6" className={`board-button ${board[5] ? board[5].toLowerCase() : 'board-button'}`}
                        onClick={() => handleClick(5)}>{board[5]}</button>
                </div>
                <div className="board-rows">
                    <button id="b7" className={`board-button ${board[6] ? board[6].toLowerCase() : 'board-button'}`}
                        onClick={() => handleClick(6)}>{board[6]}</button>
                    <button id="b8" className={`board-button ${board[7] ? board[7].toLowerCase() : 'board-button'}`}
                        onClick={() => handleClick(7)}>{board[7]}</button>
                    <button id="b9" className={`board-button ${board[8] ? board[8].toLowerCase() : 'board-button'}`}
                        onClick={() => handleClick(8)}>{board[8]}</button>
                </div>
            </div>
            {winner && (
                <div>
                    <h2>{winner} wins!</h2>
                    <button className="reset" onClick={clearBoard}>Play Again!</button>
                </div>
            )}
            {!winner && !board.includes('') && (
                <div>
                    <h2>It's a draw!</h2>
                    <button className="reset" onClick={clearBoard}>Play Again!</button>
                </div>
            )}

        </div>
    )
}
