var form = document.getElementById('search-form');

form.addEventListener('submit', function (event) {
    event.preventDefault();

    var input = document.getElementById('search-query');

    var query = input.value;

    logic.getList(query, function (beers) {
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
                    logic.getDetail(beer.id, 
                        function(url, detail){
                            if (document.getElementsByTagName('img').length) {
                                document.body.removeChild(document.getElementsByTagName('img')[0]);
                            }
                            if (document.getElementsByTagName('h2').length) {
                                document.body.removeChild(document.getElementsByTagName('h2')[0]);
                            }
                            if (document.getElementsByTagName('p').length) {
                                document.body.removeChild(document.getElementsByTagName('p')[0]);
                            }
                            var title = document.createElement('h2');
                            title.innerText = beer.name;
                            document.body.appendChild(title);
                            var description = document.createElement('p');
                            description.innerText = detail;
                            document.body.appendChild(description);
                            var img = document.createElement('img');
                            img.src = url;
                            document.body.appendChild(img);
                        })
                    }
                );

                ul.appendChild(li);
            });

            document.body.appendChild(ul);
        } else alert('no results');

    });
});