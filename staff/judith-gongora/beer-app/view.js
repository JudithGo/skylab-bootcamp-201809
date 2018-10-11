var view = {
    listBeers: function (beers) {

        this.clearList();

        this.clearDetail();

        if (beers.length) {

            var list = new List('Results', 'section', 
            function(id){
                var showBeer = view.showBeer;
                logic.retrieveBeer(id, showBeer.bind(view));
            }, beers);

            document.body.appendChild(list.element);

            
        } else alert('no results');
    },

    clearList: function () {
        var uls = document.getElementsByClassName('list');

        if (uls.length) {
            document.body.removeChild(uls[0]);
        }
    },

    showBeer: function (beer) {
        this.clearDetail();

        var image = new Image('Results', 'section', beer);

        document.body.appendChild(image.element);

    },

    clearDetail: function () {
        var details = document.getElementsByClassName('image');

        if (details.length) {
            document.body.removeChild(details[0]);
        }
    }
}