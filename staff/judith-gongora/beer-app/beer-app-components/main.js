var search = new Search('Beer App 🍺', 'section', function(){
    var query = document.querySelector('.query').value;
    var listBeers = view.listBeers;
    logic.search(query, listBeers.bind(view));
});

document.body.appendChild(search.element);
