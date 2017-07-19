/**
 * Created by 信仰 on 2017/6/28.
 */
import { getLyric } from 'api/song'
import { ERR_OK } from 'api/config'
import { Base64 } from 'js-base64'

export default class Song {
  constructor ({album, duration, id, imge, mid, name, singer, url}) {
    this.id = id
    this.mid = mid
    this.singer = singer
    this.name = name
    this.album = album
    this.duration = duration
    this.imge = imge
    this.url = url
  }

  getLyric () {
    if (this.lyric) {
      return Promise.resolve(this.lyric)
    }
    return new Promise((resolve, reject) => {
      getLyric(this.mid).then((res) => {
        if (res.retcode === ERR_OK) {
          this.lyric = Base64.decode(res.lyric)
          resolve(this.lyric)
        } else {
          reject('no lyric')
        }
      })
    })
  }
}

export function createdata (musicdata) {
  return new Song({
    id: musicdata.songid,
    mid: musicdata.songmid,
    singer: filtersinger(musicdata.singer),
    name: musicdata.songname,
    album: musicdata.albumname,
    duration: musicdata.interval,
    imge: `https://y.gtimg.cn/music/photo_new/T002R300x300M000${musicdata.albummid}.jpg?max_age=2592000`,
    url: `http://ws.stream.qqmusic.qq.com/${musicdata.songid}.m4a?fromtag=46`

  })
}
export function filtersinger (singer) {
  let ret = []
  if (!singer) {
    return
  }
  singer.forEach((s) => {
    ret.push(s.name)
  })
  return ret.join('/')
}
