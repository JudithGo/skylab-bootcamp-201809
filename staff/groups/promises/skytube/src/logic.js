import { Favourites, WatchLater, Playlists, History } from './model'
import Skylab from './skylab'
import YouTube from './youtube'

// const { Favourites, WatchLater, Playlists, History }  = require('./model')
// const  Skylab = require( './skylab')
// const YouTube = require('./youtube')

const logic = {
    skylab: new Skylab(),
    youtube: new YouTube(),
    favourites: new Favourites(),
    watch_later: new WatchLater(),
    playlists: new Playlists(),
    history: new History(),
    auth: JSON.parse(sessionStorage.getItem('auth')) || {},
    video_search: JSON.parse(sessionStorage.getItem('video_search')) || [],
    current_video: JSON.parse(sessionStorage.getItem('current_video')) || [],

    registerUser(name, surname, username, email, password) {
        if(typeof name !=='string') throw TypeError (`${name} is not a string`)
        if (!name.trim()) throw Error ('name is blank or empty')

        if(typeof surname !=='string') throw TypeError (`${surname} is not a string`)
        if (!surname.trim()) throw Error ('surname is blank or empty')

        if(typeof username !=='string') throw TypeError (`${username} is not a string`)
        if (!username.trim()) throw Error ('username is blank or empty')

        if(typeof email !=='string') throw TypeError (`${email} is not a string`)
        if (!email.trim()) throw Error ('email is blank or empty')

        if(typeof password !=='string') throw TypeError (`${password} is not a string`)
        if (!password.trim()) throw Error ('password is blank or empty')

        return this.skylab.register({
            name: name,
            surname: surname,
            username: username,
            email: email,
            password: password
        })
    },

    loginUser(username, password) {
        if(typeof username !=='string') throw TypeError (`${username} is not a string`)
        if (!username.trim()) throw Error ('username is blank or empty')

        if(typeof password !=='string') throw TypeError (`${password} is not a string`)
        if (!password.trim()) throw Error ('password is blank or empty')

        return this.skylab.login({
            username: username,
            password: password
        })
            .then(data => {
                this.auth.id = data.id
                this.auth.token = data.token
                sessionStorage.setItem('auth', JSON.stringify(this.auth))
                return this.skylab.info(this.auth.id, this.auth.token)
                    .then(info => {
                        let auth_info = {
                            username: info.username,
                            name: info.name,
                            surname: info.surname,
                            email: info.email
                        }

                        sessionStorage.setItem('auth_info', JSON.stringify(auth_info))
                        auth_info.favourites = info.favourites || []
                        sessionStorage.setItem('favourites', JSON.stringify(auth_info.favourites))
                        auth_info.watch_later = info.watch_later || []
                        sessionStorage.setItem('watch_later', JSON.stringify(auth_info.watch_later))
                        auth_info.playlists = info.playlists || []
                        sessionStorage.setItem('playlists', JSON.stringify(auth_info.playlists))
                        auth_info.history = info.history || []
                        sessionStorage.setItem('history', JSON.stringify(auth_info.history))
                        return auth_info
                    })
                    .catch(error => {
                        throw Error(error)
                    })
            })
    },

    logoutUser() {
        sessionStorage.removeItem('auth')
        sessionStorage.removeItem('auth_info')
        sessionStorage.removeItem('favourites')
        sessionStorage.removeItem('watch_later')
        sessionStorage.removeItem('playlists')
        sessionStorage.removeItem('history')
        this.auth = {}
    },

    isAuthenticated() {
        return this.auth && Object.keys(this.auth).length > 0
    },

    search(query) {
        if(typeof query !== 'string') throw TypeError(`${query} is not a string`)
        if(!query.trim()) throw Error ('query is blank or empty')

        return this.youtube.search(query)
            .then(result => {
                let list = []
                result.forEach((item) => {
                    list.push({
                        videoId: item.id.videoId,
                        title: item.snippet.title,
                        img: item.snippet.thumbnails.medium.url,
                    })

                })
                sessionStorage.setItem('video_search', JSON.stringify(list))
                return list
            })
    },

    retrieveSong(video_id,title,img) {
        if (typeof video_id !== 'string') throw TypeError(`${video_id} is not a string`)
        if (!video_id.trim()) throw Error ('video_id is blank or empty')
        if (!video_id.length === 11) throw Error ('video_id length is not valid')

        return this.youtube.getVideo(video_id)
            .then(result => {
                sessionStorage.setItem('current_video', JSON.stringify(result[0]))
                this.addHistory(video_id,title,img)
                return result[0]
            })
    },

    addFavourite(video_id) {
        this.favourites.newEntity({
            video_id: video_id
        }).save()
        this.skylab.update({favourites: this.favourites.all()}, this.auth.id, this.auth.token)
    },

    getMostPopular(){
       return this.youtube.mostPopular()
        .then(result => {
            let list = []
            result.forEach((item) => {
                list.push({
                    videoId: item.id.videoId,
                    title: item.snippet.title,
                    img: item.snippet.thumbnails.medium.url,
                })

            })
            return list
        })

    },

    addWatchLater(video_id) {
        this.watch_later.newEntity({
            video_id: video_id
        }).save()
        this.skylab.update({watch_later: this.watch_later.all()}, this.auth.id, this.auth.token)
    },

    addPlaylist(title) {
        this.playlists.newEntity({
            title: title
        }).save()
        this.skylab.update({playlists: this.playlists.all()}, this.auth.id, this.auth.token)
    },


    addHistory(video_id,title,img) {
        const finded = this.history.find({
            video_id: video_id
        })

        if (finded.length > 0) this.history.get(finded[0].id).delete()

        this.history.newEntity({
            id: video_id,
            video_id: video_id,
            title: title,
            img: img
        }).save()
        const history = this.history.all()
        if (history.length > 20) {
            this.history.get(history[0].id).delete()
        }

        this.skylab.update({history: history}, this.auth.id, this.auth.token)
    },

    addVideoToPlaylist(video, playlist_id) {
        let playlist = this.playlists.get(playlist_id)
        playlist.videos ? playlist.videos.push(video) : playlist.videos = [video]
        playlist.save()
        this.skylab.update({playlists: this.playlists.all()}, this.auth.id, this.auth.token)
    },

    removeVideoFromPlaylist(video_id, playlist_id) {
        let playlist = this.playlists.get(playlist_id)
        playlist.videos.splice(playlist.videos.indexOf(video_id), 1)
        playlist.save()
        this.skylab.update({playlists: this.playlists.all()}, this.auth.id, this.auth.token)

    },

    getFavourites() {
        return {
            title: 'Favourites',
            videos: this.favourites.all()
        }
    },

    getWatchLater() {
        return {
            title: 'Watch Later',
            videos: this.watch_later.all()
        }
    },

    getPlaylist(id) {
        return this.playlists.get(id)
    },

    getHistory() {
        return this.history.all()
    },

    authInfo() {
        let info = JSON.parse(sessionStorage.getItem('auth_info')) || {}
        if (info && Object.keys(info).length > 0) {
            info.favourites = JSON.parse(sessionStorage.getItem('favourites'))
            info.watch_later = JSON.parse(sessionStorage.getItem('watch_later'))
            info.playlists = JSON.parse(sessionStorage.getItem('playlists'))
            info.history = JSON.parse(sessionStorage.getItem('history'))
        }

        return info
    }
}

export default logic

// module.exports = logic
