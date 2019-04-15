import { combineReducers } from 'redux'
import selectList from './selectList'
import contentList from './contentList'

export default combineReducers({
  allData: selectList,
  contentData: contentList,
})
