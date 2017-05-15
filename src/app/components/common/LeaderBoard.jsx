import React, { Component } from 'react';
import { connect } from 'react-redux';

import { fetchLeaderboard } from '../../actions';

import { toMMSS } from '../../util/time'

class LeaderBoard extends Component {

    componentDidMount() {
        this.props.dispatch(fetchLeaderboard())
    }

    render() {

        let pos = 0;

        function getUser(user){
            pos++;
            return  <div key={pos} className="user">
                        { `${ pos }. ${ user.username } (${ toMMSS(parseInt(user.elapsed * 1000)) })` }
                    </div>
        }

        const half = this.props.leaderboard.length / 2;

        let left = this.props.leaderboard.filter(function (element, index)
        {
            return index < half;
        });

        let right = this.props.leaderboard.filter(function (element, index)
        {
            return index >= half;
        });

        left = left.map(getUser);
        right = right.map(getUser);

        return (
            <div className="leaderboard">
                <div className="left">{ left }</div>
                <div className="right">{ right }</div>
            </div>
        );
    }
}

const mapStateToProps = (state) =>
{
    const leaderboard = state.leaderboard;
    return { leaderboard }
};

export default connect(mapStateToProps, null)(LeaderBoard);