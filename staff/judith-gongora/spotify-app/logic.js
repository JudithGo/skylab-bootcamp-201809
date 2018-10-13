const logic = {
    token: 'BQDbiOuvDE4GwIVu67nfrQjO6mCGeBYQnCaCwBurs3HAEMeg16yPn0_r4lgj6fwCDAeF4u5Xl_y6JTYV012vIEILUTYboxFZkysccoVVB_ItzXRso8oi2vSs0FOdA4xf-E9Lg5qZQXz91AB1dTagAGGQPZwL4TE79DoCcbdpJaA-BZ_c7UrLxOo2BqdWdUKn4xgIE-XJms672_ti_5zDquWEBdAAg6opm8aay2FSTdOLgeE5PmAQbiO3ZDdO8dYpeptQExQMAbwfyHymZg',

    searchArtists(query) {
        return new Promise((resolve, reject) => {
            var xhr = new XMLHttpRequest()

            xhr.addEventListener('load', function () {
                var res = JSON.parse(xhr.responseText)

                resolve(res.artists.items)
            })

            xhr.addEventListener('error', function () {
                reject() // TODO
            })

            xhr.open('get', 'https://api.spotify.com/v1/search?type=artist&query=' + query) 

            xhr.setRequestHeader('authorization', 'Bearer ' + this.token)

            xhr.send()
        })
    },

    listAlbums(id) {
        return new Promise((resolve, reject) => {
            var xhr = new XMLHttpRequest()

            xhr.addEventListener('load', function () {
                var res = JSON.parse(xhr.responseText)

                resolve(res.items)
            })

            xhr.addEventListener('error', function () {
                reject() // TODO
            })

            xhr.open('get', 'https://api.spotify.com/v1/' + 'artists/' + id + '/albums')

            xhr.setRequestHeader('authorization', 'Bearer ' + this.token)

            xhr.send()
        })
    },

    listTracks(id) {
        return new Promise((resolve, reject) => {
            var xhr = new XMLHttpRequest()

            xhr.addEventListener('load', function () {
                var res = JSON.parse(xhr.responseText)

                resolve(res.items)
            })

            xhr.addEventListener('error', function () {
                reject() // TODO
            })

            xhr.open('get', 'https://api.spotify.com/v1/' + 'albums/' + id + '/tracks')

            xhr.setRequestHeader('authorization', 'Bearer ' + this.token)

            xhr.send()
        })
    }
}