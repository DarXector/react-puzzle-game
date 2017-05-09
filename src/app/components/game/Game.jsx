import React, { Component } from 'react';
import _ from 'lodash';
import EventBus from 'eventing-bus'

import { connect } from 'react-redux';

import { startTimer, stopTimer, resetTimer} from '../../actions/';

const layout = _.range(0, 9).map(n =>
{
    const row = Math.floor(n / 3);
    const col = n % 3;
    return [260 * col, 260 * row];
});



class Game extends Component {

    constructor(props)
    {
        super(props);
        this.state = {
            positions: this.shuffle([
                0,1,2,
                3,4,5,
                6,7,8
            ]),
            showFinished: true
        }
    }

    shuffle(array) {

        // switches first two tiles
        function switchTiles(array) {
            var i = 0;

            // find the first two tiles in a row
            while (!array[i] || !array[i+1]) i++;

            // store tile value
            var tile = array[i];
            // switche values
            array[i] = array[i+1];
            array[i+1] = tile;

            return array;
        }

        // counts inversions
        function countInversions(array) {
            // make array of inversions
            var invArray = array.map(function(num, i) {
                var inversions = 0;
                for (let j = i + 1; j < array.length; j++) {
                    if (array[j] && array[j] < num) {
                        inversions += 1;
                    }
                }
                return inversions;
            });
            // return sum of inversions array
            return invArray.reduce(function(a, b) {
                return a + b;
            });
        }

        // fischer-yates shuffle algorithm
        function fischerYates(array) {
            var counter = array.length, temp, index;

            // While there are elements in the array
            while (counter > 0) {
                // Pick a random index
                index = Math.floor(Math.random() * counter);
                // Decrease counter by 1
                counter--;
                // And swap the last element with it
                temp = array[counter];
                array[counter] = array[index];
                array[index] = temp;
            }

            return array;
        }

        // Fischer-Yates shuffle
        array = fischerYates(array);

        // check for even number of inversions
        if (countInversions(array) % 2 !== 0) {
            // switch two tiles if odd
            array = switchTiles(array);
        }
        return array;
    }

    componentDidMount() {
        setTimeout(function () {

            this.setState({
                showFinished: false
            });

            EventBus.publish("startTimer");
            this.props.startTimer(0);

        }.bind(this), 3000)
    }

    updatePosition(index)
    {
        let { positions } = this.state;
        let emptyIndex = positions.indexOf(8);
        let targetIndex = positions.indexOf(index);
        const dif = Math.abs(targetIndex - emptyIndex);

        if((emptyIndex % 3 == 0 && targetIndex == emptyIndex - 1) || (targetIndex % 3 == 0 && emptyIndex == targetIndex - 1))
            return;

        if (dif == 1 || dif == 3)
        {
            positions[emptyIndex] = index;
            positions[targetIndex] = 8;
            this.setState({ positions });
            console.log('updatePosition', positions);
            let win = _.every(positions, (value, index, array)=>
            {
                console.log('updatePosition', array[index - 1], value);
                return index == 0 || parseInt(array[index - 1]) <= parseInt(value)
            });
            if (win)
            {
                EventBus.publish("stopTimer");
                this.props.stopTimer();
            }
        }
    }

    render()
    {
        let show = null;
        if (this.state.showFinished) {
            show = <img className="finished-puzzle" src="/img/solved_bg.png" />;
        } else {
            show = this.state.positions.map((i, key)=>
            {
                let cellClass = key != 8 ? "cell" : 'empty cell';
                let [x,y] = layout[this.state.positions.indexOf(key)];
                return <div key={ key }
                            className={ cellClass }
                            onClick={ this.updatePosition.bind(this, key) }
                            style={ { transform: `translate3d(${ x + 10 }px,${ y + 10 }px,0)` } }>
                    <img src={ `/img/${ key }.png`} />
                </div>
            });
        }

        return (
            <div className="game">
                { show }
            </div>
        )
    }
}

export default connect(null, { startTimer, stopTimer, resetTimer })(Game);
