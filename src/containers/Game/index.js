import React from 'react'
import connect from 'react-redux/es/connect/connect'
import { loadCategory } from '../../ducks/config.duck'
import { Howl, Howler } from 'howler'
import ReactHowler from 'react-howler'
import Player from '../../components/Player/index'
import './Game.css'

class Game extends React.Component {
  constructor (props) {
    super(props)
    this.state = {}
  }

  render () {
    const randomArtists = this.props.tracks.map(i => i.artist)
    const gameData = Array(this.props.numberOfSongs)
      .fill()
      .map(
        i =>
          this.props.tracks[
            Math.floor(Math.random() * this.props.tracks.length)
          ]
      )
      .reduce((arr, c) => {
        let obj = {}
        obj.stream = new Howl({
          src: [c.preview_url],
          ext: ['mp3'],
          autoplay: false,
          html5: ['true']
        })
        obj.image = c.image_url
        obj.name = c.name
        obj.artists = Array(this.props.numberOfArtists).fill().map((i, ind) => {
          if (ind === 0) {
            return c.artist
          } else {
            return randomArtists[
              Math.floor(Math.random() * randomArtists.length)
            ]
          }
        })
        arr.push(obj)
        return arr
      }, [])
    console.log(gameData)
    console.log(this.props.tracks)

    return (
      <div className='game'>
        {gameData.map((i, index) => (
          <div className={'group'} key={'div' + index}>
            <h2 key={index + 'name'}>{i.name}</h2>
            <div className={'imageAndButtons'}>
              <div className={'buttongroup'} />
              <Player src={i.stream} />
              <div className='imagegroup'>
                <img id={'album'} key={index + 'image'} src={i.image} />
              </div>
            </div>
            <div className={'artists'}>
              {i.artists.map((j, innnerIndex) => (
                <h3 className={'choices'} key={innnerIndex + 'h3'}>
                  {j}
                </h3>
              ))}
            </div>
          </div>
        ))}
      </div>
    )
  }
}

const mapStateToProps = state => ({
  numberOfSongs: state.config.numberOfSongs,
  numberOfArtists: state.config.numberOfArtists,
  selectedCategory: state.config.selectedCategory,
  tracks: state.config.tracks
})
const mapDispatchToProps = dispatch => ({
  loadCategory: selectedCategory => dispatch(loadCategory(selectedCategory))
})
export default connect(mapStateToProps, mapDispatchToProps)(Game)
