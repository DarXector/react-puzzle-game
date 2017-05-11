import React, { Component } from 'react';

export default class Tile extends Component {

    clickHandler(e) {
        this.props.tileClick(e.target, this.props.key, this.props.tile);
    }

    render() {
        let cellClass = this.props.tile != '' ? "cell" : 'empty cell';
        return <div className={ cellClass }
                    onClick={ this.clickHandler.bind(this) }>
            {this.props.tile == ''? '' : <img src={ `/img/${ this.props.tile }.png`} />}
        </div>
    }
}
