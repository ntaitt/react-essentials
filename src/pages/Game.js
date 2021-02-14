import React, { useState, useEffect } from "react";
import { StyledGame, StyledScore, StyledTimer, StyledCharacter } from "../styled/Game";
import { Strong } from "../styled/Random";

export default function Game({ history }) {
    const [score, setScore] = useState(1);
    const MAX_SECONDS = 90;
    const [ms, setMs] = useState(0);
    const [seconds, setSeconds] = useState(MAX_SECONDS);


    /*previous sample
    useEffect(() => {
        const interval = setInterval(() => {
            setScore((prevScore) => { return prevScore + 1; });
        }, 1000);
        return () => { clearInterval(interval) }
    }, [score]); */

    useEffect(() => {
        const currentTime = new Date();
        const interval = setInterval(() => updateTime(currentTime), 1);
        return () => clearInterval(interval);
    }, []);

    const updateTime = (startTime) => {
        const endTime = new Date();
        const msPassedStr = (endTime.getTime() - startTime.getTime()).toString();
        const formattedMSString = ('0000' + msPassedStr).slice(-5);
        //00000 -  first 2 are hte seconds, last 3 are the ms that have passed
        const updatedSeconds = MAX_SECONDS - parseInt(formattedMSString.substring(0, 2)) - 1;
        const updatedMs = 1000 - parseInt(formattedMSString.substring(formattedMSString.length - 3));

        setSeconds(addLeadingZeros(updatedSeconds, 2));
        setMs(addLeadingZeros(updatedMs, 3));
    };

    const addLeadingZeros = (num, length) => {
        let zeros = '';
        for (let i = 0; i < length; i++) {
            zeros += "0";
        }
        return (zeros + num).slice(-length);
    };

    useEffect(() => {
        if (seconds <= -1) {
            history.push('/gameOver');
        }
    }, [seconds, ms, history]);

    useEffect(() => {
        document.addEventListener('keyup', keyUpHandler);
        return () => {
            document.removeEventListener('keyup', keyUpHandler);
        };
    }, []);

    const keyUpHandler = (event) => {
        console.log(event.key);
    };

    return (
        <StyledGame>
            <StyledScore>Score: <Strong>{score}</Strong></StyledScore>
            <StyledCharacter>A</StyledCharacter>
            <StyledTimer>Time: <Strong>{seconds}.{ms}</Strong></StyledTimer>
        </StyledGame>
    )
}