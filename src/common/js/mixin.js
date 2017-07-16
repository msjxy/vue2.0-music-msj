import { mapGetters, mapMutations } from 'vuex'
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
  watch: {
    playList(newVal) {
      this.handlePlaying(newVal)
    }
  },
  methods: {
    handlePlaying() {
      throw new Error('compenss撒大声地')
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
      'mode'
    ])
  },
  methods: {
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
    })
  }
}
