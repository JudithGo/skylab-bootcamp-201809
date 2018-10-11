function search(query, callback) {
    var xhr = new XMLHttpRequest();

    // xhr.onreadystatechange = function () {
    //     if (xhr.readyState === 4 && xhr.status === 200) {
    //         // console.log(xhr.responseText);

    //         var res = JSON.parse(xhr.responseText);

    //         // console.log(res);

    //         callback(res);
    //     }
    // };

    // xhr.addEventListener("progress", updateProgress);
    xhr.addEventListener("load", function () {
        var res = JSON.parse(xhr.responseText);
        console.log(res);
        callback(res);
    });

    xhr.addEventListener("error", function () {
        callback([]);
    });
    // xhr.addEventListener("abort", transferCanceled);

    xhr.open('get', 'https://quiet-inlet-67115.herokuapp.com/api/search/all?q=' + query);

    xhr.send();
}

function retrieveBeer(id, callback) {
    var xhr = new XMLHttpRequest();

    xhr.addEventListener("load", function () {
        var res = JSON.parse(xhr.responseText);
        if (res.labels)
        var url = res.labels.medium;
        else url= 'https://even3.blob.core.windows.net/logos/canecachoppdelivery.fe0135fdb58c4241b279.png';
        callback(url);
    });

    xhr.addEventListener("error", function () {
        callback([]);
    });

    xhr.open('get', 'https://quiet-inlet-67115.herokuapp.com/api/beer/' + id);

    xhr.send();


    

}

var form = document.getElementById('search-form');

form.addEventListener('submit', function (event) {
    event.preventDefault();

    var input = document.getElementById('search-query');

    var query = input.value;

    search(query, function (beers) {
        var uls = document.getElementsByTagName('ul');

        if (uls.length) {
            document.body.removeChild(uls[0]);
        }

        if (beers.length) {
            var ul = document.createElement('ul');

            beers.forEach(function (beer) {
                // console.log(beer.id, beer.name);

                var li = document.createElement('li');
                li.innerText = beer.name;

                li.addEventListener('click', function(e){
                    retrieveBeer(beer.id, 
                        function(url){
                            if (document.getElementsByTagName('img').length) {
                                document.body.removeChild(document.getElementsByTagName('img')[0]);
                            }
                            if (document.getElementsByTagName('h2').length) {
                                document.body.removeChild(document.getElementsByTagName('h2')[0]);
                            }
                            var title = document.createElement('h2');
                            title.innerText = beer.name;
                            document.body.appendChild(title);
                            var img = document.createElement('img');
                            img.src = url;
                            document.body.appendChild(img);
                        })
                    }
                );

                // TODO on click on beer do retrieve beer and show beer below

                ul.appendChild(li);
            });

            document.body.appendChild(ul);
        } else alert('no results');

    });
});