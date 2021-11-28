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
    var html = document.body.parentNode
    var details = document.querySelector('#details')
    var table = document.querySelector('#table')
    var scrollTop = document.querySelector('#scrollTop')

    //table stuff ↓
    var table_type = document.querySelector("#table-type")
    var table_customers = document.querySelector("#table-customers")
    var table_manufacturers = document.querySelector("#table-manufacturers")
    var table_mass_kg = document.querySelector("#table-mass-kg")
    var table_orbit = document.querySelector("#table-orbit")
    var table_nationalities = document.querySelector("#table-nationalities")
    var txt = "";

    var search_input = document.querySelector("#input")

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

        txt += `<section id="listNumber${index}" class="listNumber">
            <div id="listImage">
                <img src="${value.links.patch.small}" onerror='this.src = "https://img.whaleshares.io/wls-img/einstei1/d765e65f432e7e6f0d062616d19364ecdc5631da.png"'/>
            </div>

            <div id="listText${index}" class="listText">
                <p class="listName ${success}" id="listName ${index}">${value.name}</p>
                <p class="listDate" id="listDate${index}">${timeConverter(value.date_unix)}</p>
            </div>

            <p id="flightNumber">#${value.flight_number}</p>
        </section>`
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

                getTableData(data.payloads[0])
            })

    }

    async function getTableData(id){
        await fetch(`https://api.spacexdata.com/v4/payloads/${id}`)
            .then(response => response.json())
            .then(data => {
                table_type.innerHTML = data.type
                table_customers.innerHTML = data.customers[0]
                table_manufacturers.innerHTML = data.manufacturers[0]
                table_mass_kg.innerHTML = data.mass_kg + "kg"
                table_orbit.innerHTML = data.orbit
                table_nationalities.innerHTML = data.nationalities[0]
                console.log(data)

                if(data.mass_kg == null){
                    table_mass_kg.innerHTML = "NaN"
                }

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
    html.onkeydown = e => {
        if(e.keyCode == 27){
            if(box.style.display == "block"){
                exit()
            }
        }
    }
    
    details.addEventListener('mouseover', () => {
        table.style.display="block";
    })

    details.addEventListener('mouseout', () => {
        table.style.display="none";
    })

    search_input.addEventListener("keyup", () => {
        filterList()
    })

    function filterList() {
        var input, filter, section, div, i, txtValue;
        input = document.getElementById("input");
        filter = input.value.toUpperCase();
        section = listContent.getElementsByTagName("section");
        for (i = 0; i < section.length; i++) {
            div = section[i].getElementsByTagName("div")[1];
            txtValue = div.textContent || div.innerText;
            if (txtValue.toUpperCase().indexOf(filter) > -1) {
                section[i].style.display = "";
            }else {
                section[i].style.display = "none";
            }
        }
    }

    window.onscroll = function() {
        checkScroll()
    }

    scrollTop.addEventListener('click', () => {
        scrollToTop()
    })


    function checkScroll() {
        if (document.body.scrollTop > 700 || document.documentElement.scrollTop > 700) {
          scrollTop.style.display = "block";
        } else {
          scrollTop.style.display = "none";
        }
      }

    function scrollToTop() {
        document.body.scrollTop = 0; // For Safari
        document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
    }
}
