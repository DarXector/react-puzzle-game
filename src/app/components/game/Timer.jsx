import React, { Component } from 'react';
import { toMMSS, getElapsedTime } from '../../util/time'
import EventBus from 'eventing-bus'

import { connect } from 'react-redux';

import { saveResult } from '../../actions/';


class Timer extends Component{

    componentDidMount() {
        this.startTimerSubscription = EventBus.on('startTimer', () => {
            this.interval = setInterval(this.forceUpdate.bind(this), this.props.updateInterval || 50);
        });
        this.stopTimerSubscription = EventBus.on('stopTimer', () => {

            //const { baseTime, startedAt, stoppedAt } = this.props;
            //const time = getElapsedTime(baseTime, startedAt, stoppedAt);

            //this.props.saveResult({ time });
            clearInterval(this.interval);
        });
    }

    componentWillUnmount() {
        this.startTimerSubscription();
        this.stopTimerSubscription();
    }

    render() {
        const { baseTime, startedAt, stoppedAt } = this.props;
        const elapsed = getElapsedTime(baseTime, startedAt, stoppedAt);

        return (
            <div className="timer">
                <p className="label">VRIJEME</p>
                <p className="value-bg">88:88</p>
                <p className="value">{ toMMSS(elapsed) }</p>
            </div>
        )
    }
}

function mapStateToProps(state) {
    const { baseTime, startedAt, stoppedAt } = state.timer;
    return { baseTime, startedAt, stoppedAt };
}

export default connect(mapStateToProps, { saveResult })(Timer);
