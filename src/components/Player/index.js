import React from 'react'

class Player extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      src: '',
      playing: false
    }
    this.handleClick = this.handleClick.bind(this)
    this.handlePlay = this.handlePlay.bind(this)
    this.handlePause = this.handlePlay.bind(this)
  }

  handleClick () {
    this.setState(state => ({
      playing: !state.playing
    }))
  }

  handlePlay () {
    this.setState({
      playing: true
    })
  }

  handlePause () {
    this.setState({
      playing: false
    })
  }

  render () {
    return (
      <div>
        <button onClick={this.handlePlay}>Play</button>
        <button onClick={this.handlePause}>Pause</button>
      </div>
    )
  }
}

export default Player
