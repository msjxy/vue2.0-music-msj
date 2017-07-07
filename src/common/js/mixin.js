import {mapGetters} from 'vuex'
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
