import { LOCATION_CHANGE } from 'react-router-redux'

import configReducer from './ducks/config.duck'
import { combineReducers } from 'redux'

const routeInitialState = {
  location: null
}

export function routeReducer (state = routeInitialState, action) {
  switch (action.type) {
    case LOCATION_CHANGE:
      return {
        ...state,
        location: action.payload
      }
    default:
      return state
  }
}

export default function createReducer () {
  return combineReducers({
    route: routeReducer,
    config: configReducer
  })
}
