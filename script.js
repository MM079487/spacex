var num;

window.onload = function(){

    var title = document.querySelector('#title')
    var image = document.querySelector('#image')
    var button = document.querySelector('#button')
    var date = document.querySelector('#date')

    async function getData(){
        await fetch('https://api.spacexdata.com/v3/launches')
        .then(data => data.json())
        .then(d => {
            num = d.length - 1
            const data = d[num]
            console.log(data)

            title.innerText=data.mission_name;
            image.src = data.links.flickr_images[0]
            date.innerText=data.launch_date_utc
        })
        
    }

    getData()
    
    async function getNumber() {
        await fetch('https://api.spacexdata.com/v3/launches')
        .then(data => data.json())
        .then(d => {
                const number = prompt('Please type flight Number', d.length - 1)
                num = parseInt(number)
                const data = d[num]
                console.log(data)
                console.log(num)
    
                title.innerText=data.mission_name;
                image.src = data.links.flickr_images[0]
                date.innerText=data.launch_date_utc
            })
    }

    button.addEventListener('mousedown', getNumber)
}   
