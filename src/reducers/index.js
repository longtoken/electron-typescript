import { combineReducers } from 'redux'
import selectList from './selectList'

export default combineReducers({
  allData: selectList,
})
