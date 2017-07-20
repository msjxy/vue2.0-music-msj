import { mapGetters, mapMutations, mapActions } from 'vuex'
import { playMode } from 'common/js/config'
import { shuffle } from 'common/js/util'
export const playlistMixin = {
  computed: {
    ...mapGetters([
      'playlist'
    ])
  },
  mounted() {
    this.handlePlaying(this.playlist)
  },
  activated() {
    this.handlePlaying(this.playlist)
  },
  methods: {
    handlePlaying() {
      throw new Error('component must implement handlePlaylist method')
    }
  },
  watch: {
    playList(newVal) {
      this.handlePlaying(newVal)
    }
  }
}
export const playerMixin = {
  computed: {
    iconMode() {
      return this.mode === playMode.sequence ? 'icon-sequence' : this.mode === playMode.loop ? 'icon-loop' : 'icon-random'
    },
    ...mapGetters([
      'sequenceList',
      'currentSong',
      'playlist',
      'mode',
      'favoriteList'
    ])
  },
  methods: {
    togoFavorite(song) {
      if (this.isFavorite(song)) {
        this.deleteFavoriteList(song)
      } else {
        this.saveFavoriteList(song)
      }
    },
    getFavoriteIcon(song) {
      if (this.isFavorite(song)) {
        return 'icon-favorite'
      }
      return 'icon-not-favorite'
    },
    isFavorite(song) {
      const index = this.favoriteList.findIndex((item) => {
        return item.id === song.id
      })
      return index > -1
    },
    chingeMode() {
      const mode = (this.mode + 1) % 3
      this.stePlayMode(mode)
      let list = null
      if (mode === playMode.random) {
        console.log(mode)
        list = shuffle(this.sequenceList)
      } else {
        list = this.sequenceList
      }
      this.restCurrentIndex(list)
      this.setPlayingList(list)
    },
    restCurrentIndex(list) {
      let index = list.findIndex((item) => {
        return item.id === this.currentSong.id
      })
      this.setCurrrniIndex(index)
    },
    ...mapMutations({
      setPlayingState: 'SET_PLAYING_STATE',
      setCurrrniIndex: 'SET_CURRENTZ_INDEX',
      stePlayMode: 'SET_PLAY_MODE',
      setPlayingList: 'SET_PLAYLIST'
    }),
    ...mapActions([
      'saveFavoriteList',
      'deleteFavoriteList'
    ])
  }
}
export const searchMixin = {
  data() {
    return {
      query: '',
      refreshDelay: 100
    }
  },
  computed: {
    ...mapGetters([
      'searchHistory'
    ])
  },
  methods: {
    blurInput() {
      this.$refs.searchBox.blur()
    },
    msjlishi() {
      this.saveSearchHistory(this.query)
    },
    inQueryChange(query) {
      this.query = query
    },
    addQuery(query) {
      this.$refs.searchBox.setQuery(query)
    },
    ...mapActions([
      'saveSearchHistory',
      'deleteSearchHistory'
    ])
  }
}
