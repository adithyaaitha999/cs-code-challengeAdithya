const xhttp = new XMLHttpRequest();
xhttp.onload = function() {
    const data = JSON.parse(this.responseText);
    let elem = '<ul>';
    data.forEach(element => {
        elem += '<li>'+element.id+'</li><li>'+element.name+'</li><li>'+element.createdAt+'</li><li><a href='+element.avatar+'></a></li><br>';
    });
    elem += '</ul>';
    document.getElementById("text").innerHTML = elem;
}
xhttp.open("GET", "https://5dc588200bbd050014fb8ae1.mockapi.io/assessment");
xhttp.send();