const logic = {
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

            var token = 'BQCHE2Q4zFwGUT2B6ecSLCnYXsJRSwmw1yp5wx3ubGSBRFSh20GXtUGtrD9dkdIsMCOK5q7M04amDUC3BjYj5khufzHhEXDQOkCVGjynoYIdnMiZ0nVeoq3TNRYu8U34IuMh-O1Hj8m7GmCpT8ATOtIAddhLnROCUhf4a4NuetmCU0XzBlwQF9PF-si3KVZlIXvErPqj0h7A1Y5jqpzlTjCao2NnF5YfvaWFfOKpKrtB2CD0xsiOs2kN8AAO_MhB-0USzBYIE8XcjA-HUw'

            xhr.setRequestHeader('authorization', 'Bearer ' + token)

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

            var token = 'BQCHE2Q4zFwGUT2B6ecSLCnYXsJRSwmw1yp5wx3ubGSBRFSh20GXtUGtrD9dkdIsMCOK5q7M04amDUC3BjYj5khufzHhEXDQOkCVGjynoYIdnMiZ0nVeoq3TNRYu8U34IuMh-O1Hj8m7GmCpT8ATOtIAddhLnROCUhf4a4NuetmCU0XzBlwQF9PF-si3KVZlIXvErPqj0h7A1Y5jqpzlTjCao2NnF5YfvaWFfOKpKrtB2CD0xsiOs2kN8AAO_MhB-0USzBYIE8XcjA-HUw'

            xhr.setRequestHeader('authorization', 'Bearer ' + token)

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

            var token = 'BQCHE2Q4zFwGUT2B6ecSLCnYXsJRSwmw1yp5wx3ubGSBRFSh20GXtUGtrD9dkdIsMCOK5q7M04amDUC3BjYj5khufzHhEXDQOkCVGjynoYIdnMiZ0nVeoq3TNRYu8U34IuMh-O1Hj8m7GmCpT8ATOtIAddhLnROCUhf4a4NuetmCU0XzBlwQF9PF-si3KVZlIXvErPqj0h7A1Y5jqpzlTjCao2NnF5YfvaWFfOKpKrtB2CD0xsiOs2kN8AAO_MhB-0USzBYIE8XcjA-HUw'

            xhr.setRequestHeader('authorization', 'Bearer ' + token)

            xhr.send()
        })
    },
    playTrack(id) {
        return new Promise((resolve, reject) => {
            var xhr = new XMLHttpRequest()

            xhr.addEventListener('load', function () {
                var res = JSON.parse(xhr.responseText)

                resolve(res)
            })

            xhr.addEventListener('error', function () {
                reject() // TODO
            })

            xhr.open('get', 'https://api.spotify.com/v1/' + 'tracks/' + id)

            var token = 'BQCHE2Q4zFwGUT2B6ecSLCnYXsJRSwmw1yp5wx3ubGSBRFSh20GXtUGtrD9dkdIsMCOK5q7M04amDUC3BjYj5khufzHhEXDQOkCVGjynoYIdnMiZ0nVeoq3TNRYu8U34IuMh-O1Hj8m7GmCpT8ATOtIAddhLnROCUhf4a4NuetmCU0XzBlwQF9PF-si3KVZlIXvErPqj0h7A1Y5jqpzlTjCao2NnF5YfvaWFfOKpKrtB2CD0xsiOs2kN8AAO_MhB-0USzBYIE8XcjA-HUw'

            xhr.setRequestHeader('authorization', 'Bearer ' + token)

            xhr.send()
        })
    }
}