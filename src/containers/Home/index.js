import React from 'react'
import PropTypes from 'prop-types'
import connect from 'react-redux/es/connect/connect'

import {
  loadCategories,
  selectCategory,
  selectNumberOfSongs,
  selectNumberOfArtists,
  loadCategory
} from '../../ducks/config.duck'

class Home extends React.Component {
  componentDidMount () {
    this.props.loadCategories()
  }

  handleClick (selectedCategory) {
    this.props.loadCategory(selectedCategory)
  }

  render () {
    const numberOfSongs = [1, 2, 3].map(i => (
      <option key={i} value={i}>{i}</option>
    ))

    const numberOfArtists = [2, 3, 4].map(i => (
      <option key={i} value={i}>{i}</option>
    ))

    const selectedCategory = this.props.selectedCategory

    const categories = this.props.categories.map(category => (
      <option key={category} value={category}>
        {category}
      </option>
    ))

    return (
      <div>
        <select
          onChange={event => this.props.selectCategory(event.target.value)}
        >
          {categories}
        </select>
        <select
          onChange={event =>
            this.props.selectNumberOfSongs(parseInt(event.target.value))}
        >
          {numberOfSongs}
        </select>
        <select
          onChange={event =>
            this.props.selectNumberOfArtists(parseInt(event.target.value))}
        >
          {numberOfArtists}
        </select>

        <button
          onClick={() => {
            this.props.loadCategory(selectedCategory)
            setTimeout(() => {
              this.props.history.push('/game')
            }, 1500)
          }}
        >
          Submit
        </button>
      </div>
    )
  }
}

Home.propTypes = {
  loadCategories: PropTypes.func.isRequired,
  loadCategory: PropTypes.func.isRequired,
  selectCategory: PropTypes.func.isRequired,
  selectNumberOfSongs: PropTypes.func.isRequired,
  selectNumberOfArtists: PropTypes.func.isRequired,
  categories: PropTypes.array
}

const mapStateToProps = state => ({
  categories: state.config.categories,
  selectedCategory: state.config.selectedCategory,
  trackName: state.config.trackName,
  trackPreview: state.config.trackPreview,
  tracksURL: state.config.tracksURL
})

const mapDispatchToProps = dispatch => ({
  loadCategories: _ => dispatch(loadCategories()),
  selectCategory: evt => dispatch(selectCategory(evt)),
  selectNumberOfSongs: evt => dispatch(selectNumberOfSongs(evt)),
  selectNumberOfArtists: evt => dispatch(selectNumberOfArtists(evt)),
  loadCategory: selectedCategory => dispatch(loadCategory(selectedCategory))
})

export default connect(mapStateToProps, mapDispatchToProps)(Home)
