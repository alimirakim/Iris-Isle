import { GET_ALL_CONTENT } from '../genActions/traitActions'


export default function traitsReducer(state = {}, action) {
  switch (action.type) {
    case GET_ALL_CONTENT:
      return action.content.traits
    default:
      return state
  }
}
