import toPairs from 'lodash/toPairs'

import request from '../utils/request'
import { getAccessTokenFromLocalStorage } from './auth'

const SPOTIFY_ROOT = 'https://api.spotify.com/v1'

export function fetchTracks (id) {
  return fetchFromSpotify({
    endpoint: `playlists/${id}/tracks`,
    params: {
      limit: '100'
    }
  })
}

export function fetchCategoryPlaylists (category_id) {
  return fetchFromSpotify({
    endpoint: `browse/categories/${category_id}/playlists`,
    params: {
      limit: '1'
    }
  })
}

export function fetchTrack (id) {
  return fetchFromSpotify({
    endpoint: `tracks/${id}`
  })
}

export function fetchCategories () {
  return fetchFromSpotify({
    endpoint: 'browse/categories',
    params: {
      limit: '30'
    }
  })
}

export function fetchFromSpotify ({ endpoint, params }) {
  const spotifyToken = getAccessTokenFromLocalStorage()
  let url = [SPOTIFY_ROOT, endpoint].join('/')

  if (params) {
    const paramString = toPairs(params).map(param => param.join('=')).join('&')
    url += `?${paramString}`
  }

  const options = { headers: { Authorization: `Bearer ${spotifyToken}` } }
  return request(url, options)
}
