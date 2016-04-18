import React, {Component} from 'react'
import {render} from 'react-dom'
import './style/app.sass';

class App extends Component {
    state = {
        scrollX: 0,
    }

    handleMove = () => {
        const {scrollX} = this.state
        this.setState({
            scrollX: scrollX >= 100 ? scrollX - 200 : scrollX <= -100 ? scrollX + 200 : scrollX - 100,
        })
    }

    render() {
        const {scrollX} = this.state
        const transtion = {
            transform: `translate(${scrollX}px, 0)`
        }

        return (
            <div className="warp">
                <div onClick={this.handleMove} style={transtion} className="warp-content">
                    click me
                </div>
            </div>
        )
    }
}

render(<App />, document.getElementById('app'))
