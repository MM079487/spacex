var num;

window.onload = function load(){

    var listContent = document.querySelector('#listContent')
    var box = document.querySelector('#box')
    var title = document.querySelector('#title')
    var image = document.querySelector('#image')
    var exitButton = document.querySelector("#exit")
    var wiki = document.querySelector("#wiki")
    var webcast = document.querySelector("#webcast")
    var patch = document.querySelector("#patch")
    var txt = "";

    async function getList(){
        await fetch('https://api.spacexdata.com/v4/launches')
        .then(data => data.json())
        .then(d => {
            d.reverse().forEach(formatList)
            listContent.innerHTML = txt;
        })
        
    }

    function formatList(value, index, array){
        txt += `<h1 id="listNumber${index}" class="listNumber">${value.flight_number}<p id="listName">${value.name}</p> <p id="listDate">${timeConverter(value.date_unix)}</p></h1>` + "<br>"
    }

    getList()

    async function getData(number){
        await fetch('https://api.spacexdata.com/v4/launches')
        .then(data => data.json())
        .then(d => {
            d.reverse()
            const data = d[number]

            if(data.links.wikipedia == null){
                wiki.style.display='none';
            }

            if(data.links.webcast == null){
                webcast.style.display='none';
            }

            if(!data.links.flickr.original[0]){
                image.removeAttribute('src')
                image.alt="Image Not Found";
            }

            if(data.links.patch.small == null){
                patch.src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQysHIDmzqCkdLOCk-b5BZeqNJyQHjYt7BucxT_NidPZCNn72FQ9S-6knpuz86ggey-ArY&usqp=CAU';
                patch.alt="Image Not Found";
            }

            box.style.display="block";
            title.innerHTML=data.name;
            image.src = data.links.flickr.original[0]
            wiki.href=data.links.wikipedia
            webcast.href=data.links.webcast
            patch.src = data.links.patch.small
        })
        
    }

    window.onclick = e => {
        if(e.target.id.includes('listNumber')){
            var numb = e.target.id.match(/\d/g)
            numb = numb.join("")
            getData(numb)
        }
    }

    function exit(){
        box.style.display="none";
    }

    function timeConverter(UNIX_timestamp){
        var a = new Date(UNIX_timestamp * 1000);
        var year = a.getFullYear();
        var month = a.getMonth();
        var date = a.getDate();
        var hour = a.getHours();
        var min = a.getMinutes();
        var sec = a.getSeconds();
        min = checkTime(min)
        sec = checkTime(sec)
        var time = date + '/' + month + '/' + year + ' ' + hour + ':' + min + ':' + sec ;
        return time;
    }

    function checkTime(i) {
        if (i < 10) {i = "0" + i};
        return i;
    }

    exitButton.addEventListener("mousedown", exit)
}   
