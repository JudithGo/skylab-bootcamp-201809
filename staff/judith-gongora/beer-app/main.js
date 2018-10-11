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
        if (document.getElementsByTagName('section').length) {
            document.body.removeChild(document.getElementsByTagName('section')[0]);
        }

        if (beers.length) {
            var ul = document.createElement('ul');

            beers.forEach(function (beer) {

                var li = document.createElement('li');

                var a = document.createElement('a');
                li.href = '#';
                a.innerText = beer.name;
                li.appendChild(a);

                a.addEventListener('click', function(e){
                    logic.getDetail(beer.id, 
                        function(url, text){
                            if (document.getElementsByTagName('section').length) {
                                document.body.removeChild(document.getElementsByTagName('section')[0]);
                            }
                           
                            var detail = document.createElement('section');
                            document.body.appendChild(detail);
                            var title = document.createElement('h2');
                            title.innerText = beer.name;
                            detail.appendChild(title);
                            var description = document.createElement('p');
                            description.innerText = text;
                            detail.appendChild(description);
                            var img = document.createElement('img');
                            img.src = url;
                            detail.appendChild(img);
                        })
                    }
                );

                ul.appendChild(li);
            });

            document.body.appendChild(ul);
        } else alert('no results');

    });
});