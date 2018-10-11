function Search(title, tag,  searchCallback) {
    Panel.call(this, title, tag);

    this.element.className = 'search';

    this.form = document.createElement('form');
    this.element.appendChild(this.form);
    
    this.div_search = document.createElement('div');
    this.div_search.className = 'div';

    this.search_h1 = document.createElement('h1');
    this.search_h1.innerText = 'Beer App 🍺';
    this.div_search.appendChild(this.search_h1);
    
    this.input_search = document.createElement('input');
    this.input_search.className='query';
    this.div_search.appendChild(this.input_search);
    this.form.appendChild(this.input_search);

    this.search = document.createElement('button');
    this.search.innerText = 'Search';
    this.search.type='button';
    this.search.addEventListener('click', searchCallback);
    this.form.appendChild(this.search);
}

Search.prototype = Object.create(Panel.prototype);
Search.prototype.constructor = Search;



function List(title, tag, imageCallback, beers) {
    Panel.call(this, title, tag);
    
    this.element.className = 'list';

    this.ul = document.createElement('ul');
    this.element.appendChild(this.ul);

    var self = this;

    beers.forEach(function(beer) {
        
        var li = document.createElement('li');

        var a = document.createElement('a');

        a.href = '#';
        a.innerText = beer.name;

        a.addEventListener('click', function (){
            imageCallback(beer.id) });

        li.appendChild(a);

        self.ul.appendChild(li);
    
    });

}

List.prototype = Object.create(Panel.prototype);
List.prototype.constructor = List;

function Image(title, tag, id) {
    Panel.call(this, title, tag);
    
    this.element.className = 'image';

    this.h2 = document.createElement('h2');
    this.element.appendChild(this.h2);
    this.h2.innerText = id.name;

    this.description = document.createElement('p');
    this.element.appendChild(this.description);
    this.description.innerText = id.description;

    this.img = document.createElement('img');
    this.element.appendChild(this.img);
    this.img.src = id.labels ? id.labels.medium : 'https://visualpharm.com/assets/797/Beer-595b40b65ba036ed117d2949.svg';
    this.img.style.width = '300px';
}

Image.prototype = Object.create(Panel.prototype);
Image.prototype.constructor = Image;


