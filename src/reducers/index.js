import { combineReducers } from 'redux'
import activeSelect from './active'
import selectList from './selectList'
import contentList from './contentList'

export default combineReducers({
  activeSelect,
  allData: selectList,
  contentData: contentList,
})
