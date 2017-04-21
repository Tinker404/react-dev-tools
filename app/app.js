import React, {Component} from 'react'
import {render} from 'react-dom'
import './style/app.less';
import './style/test.styl'

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
    const transition = {
      transform: `translate(${scrollX}px, 0)`
    }

    return (
      <div className="warp">
        <div onClick={this.handleMove} style={transition} className="warp-content">
          click me
        </div>
        
        <div className="img"></div>

        <div className="test">
          hello
        </div>
      </div>
    )
  }
}

render(<App />, document.getElementById('app'))