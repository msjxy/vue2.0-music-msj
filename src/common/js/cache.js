/**
 * Created by 信仰 on 2017/7/11.
 */
import storage from 'good-storage'
const SEARCH_KEY = '_search_'
const SEARCH_MAX_LENGHT = 15

const PLAY_KEY = '_play_'
const PLAY_MAX_LENGHT = 200

const FACORITE_KEY = '_favorite_'
const FAVORITE_MAX_LENGTH = 200
function insertArray (arr, val, compare, maxLen) {
  const index = arr.findIndex(compare)
  if (index === 0) {
    return
  }
  if (index > 0) {
    arr.splice(index, 1)
  }
  arr.unshift(val)
  if (maxLen && arr.length > maxLen) {
    arr.pop()
  }
}

function deleteFromArray (arr, compare) {
  const index = arr.findIndex(compare)
  if (index > -1) {
    arr.splice(index, 1)
  }
}

export function saveSearch (query) {
  let searches = storage.get(SEARCH_KEY, [])
  insertArray(searches, query, (item) => {
    return item === query
  }, SEARCH_MAX_LENGHT)
  storage.set(SEARCH_KEY, searches)
  return searches
}
export function loadSearch () {
  return storage.get(SEARCH_KEY, [])
}
export function deleteSearch (query) {
  let searches = storage.get(SEARCH_KEY, [])
  deleteFromArray(searches, (item) => {
    return item === query
  })
  storage.set(SEARCH_KEY, searches)
  return searches
}

export function clearSearch () {
  storage.remove(SEARCH_KEY)
  return []
}

export function savePlay (song) {
  let songs = storage.get(PLAY_KEY, [])
  insertArray(songs, song, (item) => {
    return item.id === song.id
  }, PLAY_MAX_LENGHT)
  storage.set(PLAY_KEY, songs)
  return songs
}

export function loadplay () {
  return storage.get(PLAY_KEY, [])
}

export function saveFavorite (song) {
  let songs = storage.get(FACORITE_KEY, [])
  insertArray(songs, song, (item) => {
    return song.id === item.id
  }, FAVORITE_MAX_LENGTH)
  storage.set(FACORITE_KEY, songs)
  return songs
}
export function deleteFavorite (song) {
  let songs = storage.get(FACORITE_KEY, [])
  deleteFromArray(songs, (item) => {
    return song.id === item.id
  })
  storage.set(FACORITE_KEY, songs)
  return songs
}
export function loadFavorite () {
  return storage.get(FACORITE_KEY, [])
}
