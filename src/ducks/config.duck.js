import {
  fetchCategories,
  fetchTracks,
  fetchCategoryPlaylists
} from '../services/api'

export const LOAD_CATEGORIES_BEGIN =
  'cooksys/whos-who/Home/LOAD_CATEGORIES_BEGIN'
export const LOAD_CATEGORIES_FAILURE =
  'cooksys/whos-who/Home/LOAD_CATEGORIES_FAILURE'
export const LOAD_CATEGORIES_DONE = 'cooksys/whos-who/Home/LOAD_CATEGORIES_DONE'
export const LOAD_CATEGORIES_UPDATE =
  'cooksys/whos-who/Home/LOAD_CATEGORIES_UPDATE'
export const SELECT_CATEGORY = 'cooksys/whos-who/Home/SELECT_CATEGORY'
export const LOAD_TRACK_DONE = 'cooksys/whos-who/HOME/LOAD_TRACK_DONE'
export const LOAD_TRACK_FAILURE = 'cooksys/whos-who/Home/LOAD_TRACK_FAILURE'
export const LOAD_CATEGORY_FAILURE =
  'cooksys/whos-who/Home/LOAD_CATEGORY_FAILURE'
export const LOAD_CATEGORY_DONE = 'cooksys/whos-who/Home/LOAD_CATEGORY_DONE'
export const SELECT_NUMBER_OF_SONGS =
  'cooksys/whos-who/Home/SELECT_NUMBER_OF_SONGS'
export const SELECT_NUMBER_OF_ARTISTS =
  'cooksys/whos-who/Home/SELECT_NUMBER_OF_ARTISTS'

const initialState = {
  categories: [],
  errorLoadingCategories: false,
  numberOfSongs: 1,
  numberOfArtists: 2,
  selectedCategory: 'Pop'
}

export default function (state = initialState, action) {
  switch (action.type) {
    case LOAD_CATEGORIES_DONE:
      return {
        ...state,
        errorLoadingCategories: false,
        categories: action.payload
      }
    case LOAD_CATEGORIES_FAILURE:
      return {
        ...state,
        errorLoadingCategories: true,
        categories: initialState.categories
      }
    case SELECT_CATEGORY:
      return {
        ...state,
        selectedCategory: action.payload
      }
    case LOAD_TRACK_DONE:
      return {
        ...state,
        trackName: action.payload,
        trackPreview: action.preview
      }
    case SELECT_NUMBER_OF_SONGS:
      return {
        ...state,
        numberOfSongs: action.payload
      }
    case SELECT_NUMBER_OF_ARTISTS:
      return {
        ...state,
        numberOfArtists: action.payload
      }
    case LOAD_CATEGORY_DONE:
      return {
        ...state,
        tracks: action.payload
      }
    default:
      return state
  }
}

export const selectCategory = category => ({
  type: SELECT_CATEGORY,
  payload: category
})

export const selectNumberOfSongs = number => ({
  type: SELECT_NUMBER_OF_SONGS,
  payload: number
})

export const selectNumberOfArtists = number => ({
  type: SELECT_NUMBER_OF_ARTISTS,
  payload: number
})

const loadCategoriesDone = categories => ({
  type: LOAD_CATEGORIES_DONE,
  payload: categories
})

const loadCategoriesFailure = () => ({
  type: LOAD_CATEGORIES_FAILURE
})

const loadCategoryDone = tracks => ({
  type: LOAD_CATEGORY_DONE,
  payload: tracks
})

const loadCategoryFailure = () => ({
  type: LOAD_CATEGORY_FAILURE
})

export const loadCategories = () => dispatch =>
  fetchCategories()
    .then(({ categories }) => {
      const categoryNames = categories.items
        .map(c => c.name)
        .filter(
          i =>
            !i.includes('Top Lists') &&
            !i.includes('Dance/Electronic') &&
            !i.includes('Electronic/Dance') &&
            !i.includes('Amplify: 100% Latinx') &&
            !i.includes('Black history is now') &&
            !i.includes('Amplify: Pride') &&
            !i.includes('Folk & Acoustic') &&
            !i.includes('R&B')
        )

      console.log(categoryNames)
      return dispatch(loadCategoriesDone(categoryNames))
    })
    .catch(err => dispatch(loadCategoriesFailure(err)))

export const loadCategory = category_id => dispatch =>
  fetchCategoryPlaylists(category_id.replace(/\W/g, '').toLowerCase())
    .then(data => {
      const tracks = data.playlists.items[0].tracks.href
      return tracks.slice(37, 59)
    })
    .then(tracksID => {
      return fetchTracks(tracksID)
    })
    .then(trackData => {
      return trackData.items.reduce((arr, c) => {
        let obj = {}
        obj.image_url = c.track.album.images[1].url
        obj.preview_url = c.track.preview_url
        obj.artist = c.track.artists.map(i => i.name).join(' & ')
        obj.name = c.track.name
        arr.push(obj)
        return arr
      }, [])
    })
    .then(obj => {
      let filterNull = obj.filter(i => i.preview_url !== null)
      dispatch(loadCategoryDone(filterNull))
    })
    .catch(err => loadCategoryFailure(err))
