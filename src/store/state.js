import {playMode} from 'common/js/config'
import {loadSearch, loadplay} from 'common/js/cache'
const state = {
  singer: {},
  playing: false,
  fullScreen: false,
  playlist: [],
  sequenceList: [],
  mode: playMode.sequence,
  currentIndex: -1,
  disc: {},
  topList: {},
  searchHistory: loadSearch(),
  playHistory: loadplay()
}
export default state
