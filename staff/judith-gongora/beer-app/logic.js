var logic = (function () {
    return {
        getList: function (query, callback) {
            var xhr = new XMLHttpRequest();
        
            xhr.addEventListener("load", function () {
                var res = JSON.parse(xhr.responseText);
                console.log(res);
                callback(res);
            });
        
            xhr.addEventListener("error", function () {
                callback([]);
            });
        
            xhr.open('get', 'https://quiet-inlet-67115.herokuapp.com/api/search/all?q=' + query);
        
            xhr.send();
        },

        getDetail: function (id, callback) {
            var xhr = new XMLHttpRequest();
        
            xhr.addEventListener("load", function () {
                var res = JSON.parse(xhr.responseText);
                if (res.labels)
                var url = res.labels.medium;
                else url= 'https://even3.blob.core.windows.net/logos/canecachoppdelivery.fe0135fdb58c4241b279.png';
                if (res.description) var detail = res.description;
                else detail = 'No exist description.';
                callback(url, detail);
            });
        
            xhr.addEventListener("error", function () {
                callback([]);
            });
        
            xhr.open('get', 'https://quiet-inlet-67115.herokuapp.com/api/beer/' + id);
        
            xhr.send();
        }
    };
})();
