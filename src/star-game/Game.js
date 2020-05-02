import React, { useState, useEffect } from 'react';
import Utils from './Utils';
import { colors, gameEndStatus } from './Constants';
import CreateStars from './Stars';
import GameNumber from './GameNumber';
import PlayAgain from './PlayAgain';



const StarMatchGame = () => {
    const [stars, setStars] = useState(Utils.random(1, 9));
    const [gameIsDone, setGameDone] = useState(false);
    const arrayOfNumbers = Utils.range(1, 9);
    const [selectedNums, setSelectedNums] = useState([]);
    const [availableNums, setAvailableNums] = useState(Utils.range(1, 9));
    const [gameStatus, setGameEndStatus] = useState('');
    const [secondsLeft, setSecondsLeft] = useState(10);
    let timerOnSecondsLeft;

    useEffect(() => {
        if (availableNums.length > 0 && secondsLeft > 0 && !gameIsDone) {
            timerOnSecondsLeft = setTimeout(() => {
                return setSecondsLeft(secondsLeft - 1);
            }, 1000);

            return () => {
                clearTimeout(timerOnSecondsLeft);
            }
        }

        if (secondsLeft === 0) {
            resetGame({ timerEnd: true });
        }
    }, [secondsLeft]);


    const resetGame = (params) => {
        if (params.playAgain) {
            setStars(Utils.random(1, 9));
            setAvailableNums(Utils.range(1, 9));
            setSelectedNums([]);
            setGameDone(false);
            setSecondsLeft(10);
        } else if (params.gameSuccess) {
            setGameDone(true);
            setSelectedNums([]);
            setAvailableNums(Utils.range(1, 9));
            setGameEndStatus(gameEndStatus.SUCCESS_END);
            clearTimeout(timerOnSecondsLeft);
        } else if (params.wrongSelection) {
            setGameDone(true);
            setAvailableNums(Utils.range(1, 9));
            setGameEndStatus(gameEndStatus.WRONG_SEL_END);
            clearTimeout(timerOnSecondsLeft);
        } else if (params.timerEnd) {
            setGameDone(true);
            setGameEndStatus(gameEndStatus.TIMER_END);
        }
    };


    const onPlayAgain = () => {
        resetGame({ playAgain: true });
    }


    const getNumberStatus = (num) => {
        if (!availableNums.includes(num)) {
            return colors.used;
        }
        if (selectedNums.includes(num)) {
            return wrongSelection(selectedNums) ? colors.wrong : colors.candidate;
        }

        return colors.available;
    }


    const wrongSelection = (newSelectedNums) => {
        return Utils.sum(newSelectedNums) > stars
    };

    const performNumberCalc = (num, status) => {
        if (status === colors.used) {
            return;
        }
        if (status === colors.available) {
            const newSelectedNums = selectedNums.concat(num);
            setSelectedNums(newSelectedNums);

            if (Utils.sum(newSelectedNums) === stars) {
                const newAvailableNums = availableNums.filter(n => !newSelectedNums.includes(n));
                const gameIsSuccess = newAvailableNums.length === 0;
                if (gameIsSuccess) {
                    resetGame({ gameSuccess: true });

                } else {
                    setAvailableNums(newAvailableNums);
                    setSelectedNums([]);
                    setStars(Utils.randomSumIn(newAvailableNums, 9));
                }
                return;
            }

            if (wrongSelection(newSelectedNums)) {
                resetGame({ wrongSelection: true });
                return;
            }
        }
    }

    return (
        <div className="game">
            <div className="body">
                <div className="left">
                    {gameIsDone ? <PlayAgain startGame={onPlayAgain} gameStatus={gameStatus}></PlayAgain> :
                        <CreateStars count={stars}></CreateStars>}
                </div>
                <div className="right">
                    {
                        arrayOfNumbers.map(num => {
                            return <GameNumber key={num}
                                num={num}
                                gameIsDone={gameIsDone}
                                status={getNumberStatus(num)}
                                performNumberCalc={performNumberCalc}
                            ></GameNumber>
                        })
                    }
                </div>
            </div>
            <div className="timer">Time Remaining: {secondsLeft}</div>
        </div>
    );
};



export default StarMatchGame;
