var num;

window.onload = function load() {
    setTimeout(() => {
        document.getElementById('content').style.display = "block";
        document.getElementById('loader').style.display = "none";
    }, 3000);

    var listContent = document.querySelector('#listContent')
    var box = document.querySelector('#box')
    var title = document.querySelector('#title')
    var image = document.querySelector('#image')
    var exitButton = document.querySelector("#exit")
    var wiki = document.querySelector("#wiki")
    var webcast = document.querySelector("#webcast")
    var patch = document.querySelector("#patch")
    var next_button = document.querySelector("#next-button")
    var previous_button = document.querySelector("#previous-button")
    var txt = "";

    async function getList() {
        await fetch('https://api.spacexdata.com/v4/launches')
            .then(data => data.json())
            .then(d => {
                d.reverse().forEach(formatList)
                listContent.innerHTML = txt;
            })

    }

    function formatList(value, index, array) {
        var success = "";
        if (value.success == true) {
            success = "true"
        } else if (value.success == false) {
            success = "false"
        } else {
            success = "coming"
        }

        txt += `<h1 id="listNumber${index}" class="listNumber">
            <div id="listImage">
                <img src="${value.links.patch.small}" onerror='this.src = "https://img.whaleshares.io/wls-img/einstei1/d765e65f432e7e6f0d062616d19364ecdc5631da.png"'/>
            </div>

            <div id="listText${index}" class="listText">
                <p class="listName ${success}" id="listName ${index}">${value.name}</p>
                <p class="listDate" id="listDate${index}">${timeConverter(value.date_unix)}</p>
            </div>

            <p id="flightNumber">#${value.flight_number}</p>
        </h1>` + "<br>"
    }

    getList()

    var imgArray = [];

    async function getData(number) {
        await fetch('https://api.spacexdata.com/v4/launches')
            .then(data => data.json())
            .then(d => {
                x = 0;
                d.reverse()
                const data = d[number]

                wiki.style.display = "block";
                webcast.style.display = 'block';

                if (data.links.wikipedia == null) {
                    wiki.style.display = 'none';
                }

                if (data.links.webcast == null) {
                    webcast.style.display = 'none';
                }

                if (data.links.flickr.original.length <= 1) {
                    next_button.style.display = "none"
                    previous_button.style.display = "none"
                } else {
                    next_button.style.display = "block"
                    previous_button.style.display = "block"
                }

                image.style.display = "none";
                document.getElementById('imgLoader').style.display = "";
                image.onload = function () {
                    image.style.display = "block";
                    document.getElementById('imgLoader').style.display = "none";
                }

                box.style.display = "block";
                title.innerHTML = data.name;
                image.src = data.links.flickr.original[0]
                wiki.href = data.links.wikipedia
                webcast.href = data.links.webcast
                patch.src = data.links.patch.small
                imgArray = data.links.flickr.original
            })

    }

    next_button.addEventListener('mousedown', () => {
        nextPic(imgArray)
    })

    previous_button.addEventListener('mousedown', () => {
        previousPic(imgArray)
    })

    var x = 0;
    function nextPic(imgArray) {
        x++
        if (imgArray.length == 1) {
            return true;
        }else if(x >= imgArray.length - 1){
            x = imgArray.length - 2
            alert("There have no more pictures!")
        } else if (imgArray.length >= 2) {
            image.src = imgArray[x]
            image.style.display = "none";
            document.getElementById('imgLoader').style.display = "";
            image.onload = function () {
                image.style.display = "block";
                document.getElementById('imgLoader').style.display = "none";
            }
        }
    }

    function previousPic(imgArray) {
        --x;

        if(x < 0){
            x = 0
        }
        
        if(x <= 0){
            alert("This is the first picture")
            return true;
        }
        image.src = imgArray[x]
        image.style.display = "none";
        document.getElementById('imgLoader').style.display = "";
        image.onload = function () {
            image.style.display = "block";
            document.getElementById('imgLoader').style.display = "none";
        }
    }

    var numb;

    //I think this is the stupid way to fix that bug
    window.onclick = e => {
        if (e.target.parentNode.id.includes('listNumber') || e.target.parentNode.id.includes('listText')) {
            numb = e.target.parentNode.id.match(/\d/g)
            numb = numb.join("")
            getData(numb)
        } else if (e.target.id.includes('listNumber')) {
            numb = e.target.id.match(/\d/g)
            numb = numb.join("")
            getData(numb)
        }
    }

    function exit() {
        box.style.display = "none";
    }

    function timeConverter(UNIX_timestamp) {
        var a = new Date(UNIX_timestamp * 1000);
        var year = a.getFullYear();
        var month = a.getMonth() + 1;
        var date = a.getDate();
        var hour = a.getHours();
        var min = a.getMinutes();
        var sec = a.getSeconds();
        min = checkTime(min)
        sec = checkTime(sec)
        var time = date + '/' + month + '/' + year + ' ' + hour + ':' + min + ':' + sec;
        return time;
    }

    function checkTime(i) {
        if (i < 10) { i = "0" + i };
        return i;
    }

    exitButton.addEventListener("mousedown", exit)
}
