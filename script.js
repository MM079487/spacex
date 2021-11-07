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
        var success = "";
        if(value.success == true){
            success="true"
        }else if(value.success == false){
            success="false"
        }else{
            success="coming"
        }

        txt += `<h1 id="listNumber${index}" class="listNumber">
            <div id="listImage">
                <img src="${value.links.patch.small}" onerror='this.src = "https://img.whaleshares.io/wls-img/einstei1/d765e65f432e7e6f0d062616d19364ecdc5631da.png"'/>
            </div>

            <div id="listText">
                <p class="listName ${success}" id="listName ${index}">${value.name}</p>
                <p class="listDate" id="listDate${index}">${timeConverter(value.date_unix)}</p>
            </div>

            <p id="flightNumber">#${value.flight_number}</p>
        </h1>` + "<br>"
    }

    getList()

    async function getData(number){
        await fetch('https://api.spacexdata.com/v4/launches')
        .then(data => data.json())
        .then(d => {
            d.reverse()
            const data = d[number]

            if(!data.links.wikipedia){
                wiki.style.display='none';
            }

            if(!data.links.webcast){
                webcast.style.display='none';
            }

            if(!data.links.flickr.original[0]){
                image.removeAttribute('src')
                image.alt="Image Not Found";
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
        if(e.target.id.includes('listName')){
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
        var month = a.getMonth() + 1;
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
