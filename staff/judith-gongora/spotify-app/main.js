const $artists = $('.artists')
const $albums = $('.albums')
const $tracks = $('.tracks')
const $playTrack = $('.playTrack')

$artists.hide()
$albums.hide()
$tracks.hide()
$playTrack.hide()

const $form = $('form')

$form.submit(event => {
    event.preventDefault()

    const $input = $form.find('input')

    const query = $input.val()

    logic.searchArtists(query)
        .then(artists => {
            listArtist(artists)
        })
        .catch(console.error)
})

function listArtist(artists) {
    $artists.show()

    const $ul = $artists.find('ul')

    $ul.empty()

    artists.forEach(artist => {
        const $a = $(`<a href="#">${artist.name}</a>`)

        $a.click(() => {
            logic.listAlbums(artist.id)
            .then(albums => {
                listAlbums(albums, artist.name)
            })
            .catch(console.error)
        })

        const $li = $('<li>')

        $li.append($a)

        $ul.append($li)
    })
}

function listAlbums(albums, name) {
    $albums.show()

    const $ul = $albums.find('ul')
    const $h3 = $albums.find('h3')

    $h3.text('Albums of ' + name)
    $ul.empty()

    albums.forEach(album => {
        const $a = $(`<a href="#">${album.name}</a>`)

        $a.click(() => {
            logic.listTracks(album.id)
            .then(tracks => {
                listTracks(tracks, album.name)
            })
            .catch(console.error)

        })

        const $li = $('<li>')

        $li.append($a)

        $ul.append($li)
    })
}

function listTracks(tracks, name) {
    $tracks.show()

    const $ul = $tracks.find('ul')
    const $h3 = $tracks.find('h4')

    $h3.text('Tracks of the Album' + name)
    $ul.empty()

    tracks.forEach(track => {
        const $a = $(`<a href="#">${track.name}</a>`)

        $a.click(() => {
            console.log(track)
            logic.playTrack(track.id, track.name)
            .then(tracks => {
                playTrack(tracks)
            })
            .catch(console.error)

        })

        const $li = $('<li>')

        $li.append($a)

        $ul.append($li)
    })
}

function playTrack(track, name) {
    $playTrack.show()

    const $h5 = $tracks.find('h5')
    const $audio = $tracks.find('audio')

    $h5.text('Listening' + name)
    $audio.attr("src",track)

    $audio.attr('autoplay')

    
}