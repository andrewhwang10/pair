function addCard() {
    console.log("Creating");

    let column = $('<div class="col-sm-6 col-lg-4"></div>');
    let card = $('<div class="card mb-4 small-shadow" alt="Card image cap"></div>');

    var img = $('<img class="card img-top img-fluid">')
    
    var reader = new FileReader();
    reader.addEventListener('load', function() {
        img.attr('src', reader.result);
        console.log("Success")
    }, false);
    
    reader.readAsDataURL(document.getElementById('fileInput').files[0]);

    let body = $('<div class="card-body"></div>');
    let title = $('#titleInput').val();
    console.log(title);
    let header = $('<h5 class="card-title"></h5>').text(title);

    let description = $('#descriptionInput').val();
    console.log(description)
    let paragraph = $('<p class="card-text text-truncate"></p>').text(description);

    let button = $('<button class="btn">Pair</button>');

    body.append(header).append(paragraph).append(button);
    card.append(img).append(body);
    column.append(card);
    $('.row').append(column);
    $('#modalForm').modal('hide');
}
$("#addCard").click(function(){addCard()});