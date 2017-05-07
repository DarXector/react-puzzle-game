export const TIMER_START = 'timer_start';
export const TIMER_STOP = 'timer_stop';
export const TIMER_RESET = 'timer_reset';

export const resetTimer = () => {
    return {
        type: "RESET_TIMER",
        now: new Date().getTime()
    }
};

export const startTimer = (baseTime = 0) => {
    return {
        type: TIMER_START,
        baseTime: baseTime,
        now: new Date().getTime()
    };
};

export const stopTimer = () => {
    return {
        type: TIMER_STOP,
        now: new Date().getTime()
    };
};