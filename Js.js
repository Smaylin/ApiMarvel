
let btn = document.getElementById("button");
let $container = document.getElementById("container");
let $style = document.querySelector("style")
let pagina = 1;


btn.addEventListener('click',()=>{
    let caja=document.getElementById('caja').value
    let APIMovie = `https://gateway.marvel.com/v1/public/characters?name=${caja}&ts=1&apikey=324ec0083186bfcae492caad61761546&hash=2d2dba620258e467621323bb725ab2fd`; 
    async function loadMovie(url){
        try{
            $container.innerHTML =  `<img class="loader" src="../assets/loader.svg" alt="Cargando..."> ` ;
            let res = await fetch(url),
            json = await res.json();
            let routeExtenxionImg="/portrait_xlarge.jpg";

            $template = "";
            $template += `
            </div>
            <div class="card" style="width: 200px;">
                <img src="${json.data.results[0].thumbnail.path+routeExtenxionImg}" class="card-img-top" alt="...">
                    <div class="card-body">
                        <h5 class="card-title">${json.data.results[0].name}</h5>
                        <p class="card-text">${json.data.results[0].description}</p>
                        <a href="${json.data.results[0].urls[0].url}" class="btn btn-primary">Go somewhere</a>
                    </div>
            </div>
        </div>
            `;
            $container.innerHTML = $template;
        }catch(err){
            let message=err.statusText || "Ocurrió un error";
            $container.innerHTML=`<p>Error ${err.status}: ${message}</p>`;
            
        }
    }
    document.addEventListener("DOMContentLoaded", e= loadMovie(APIMovie));
});


// 


const d = document,
$main = d.querySelector("main"),
$links = d.querySelector(".links");

let offset = 0;
function netx(){    
    console.log(offset =offset+20);
}
function previous(){    
    console.log(offset =offset-20);
}


let marvelAPI = `https://gateway.marvel.com/v1/public/characters?offset=${offset}&limit=20&ts=1&apikey=324ec0083186bfcae492caad61761546&hash=2d2dba620258e467621323bb725ab2fd`;
// api1 https://gateway.marvel.com/v1/public/characters?offset=${offset}&limit=20&ts=1&apikey=324ec0083186bfcae492caad61761546&hash=2d2dba620258e467621323bb725ab2fd
// api1smailin240 https://gateway.marvel.com/v1/public/characters?ts=1&apikey=324ec0083186bfcae492caad61761546&hash=2d2dba620258e467621323bb725ab2fd
// Buscador   https://gateway.marvel.com/v1/public/characters?name=thor&ts=1&apikey=324ec0083186bfcae492caad61761546&hash=2d2dba620258e467621323bb725ab2fd
// api2Robles https://gateway.marvel.com/v1/public/comics?ts=1&apikey=4c37cbfce436ecdb67fca8aba42491ca&hash=54b8de1b7cab4600f9fd1effa11b75c7
async function loadComics(url){
    
    try{
    $main.innerHTML = `<img class="loader" src="./assets/loader.svg" alt="Cargando..."> ` ;
    let res = await fetch(url),
    json = await res.json(),
    $template = "",
    $prevLink,
    $nextLink;
    // console.log(json);
    for(let i=0; i<json.data.results.length;i++){
    // console.log(json.data.results[i].name);
    let ts = "?ts=1&";
    let api = "apikey=324ec0083186bfcae492caad61761546&hash=2d2dba620258e467621323bb725ab2fd"
    let routeExtenxionImg="/portrait_xlarge.jpg";
    try{
        let res=await fetch(json.data.results[i].resourceURI+ts+api),
        Marvel=await res.json();
        console.log(Marvel.data.results[0].urls[0].url);

        $template += `
        </div>
            <div class="card" style="width: 200px;">
                <img src="${Marvel.data.results[0].thumbnail.path+routeExtenxionImg}" class="card-img-top" alt="...">
                    <div class="card-body">
                        <h5 class="card-title">${Marvel.data.results[0].name}</h5>
                        <p class="card-text">${Marvel.data.results[0].description}</p>
                        <a href="${Marvel.data.results[0].urls[0].url}" class="btn btn-primary">Go somewhere</a>
                    </div>
            </div>
        </div>
            `;
        }catch(err){
            let message=err.statusText || "Ocurrió un error";
            $template += `
            <figure>
                <figcaption>Error ${err.status}: ${message}</figcaption>
            </figure>
                `;
        }
    }
    $main.innerHTML = $template;
    }catch(err){
        let message=err.statusText || "Ocurrió un error";
        $main.innerHTML=`<p>Error ${err.status}: ${message}</p>`;
    }
}
    d.addEventListener("DOMContentLoaded", e= loadComics(marvelAPI));
    d.addEventListener("click", e=>{
    if(e.target.matches(".links a")){
    e.preventDefault()
    loadComics(e.target.getAttribute("href"))
    }
})


        // console.log(Marvel.data.results[0]);
        // console.log(Marvel.data.results);
        // console.log(Marvel.data.results[0].thumbnail.path+routeExtenxionImg);

// $prevLink = json.previous? `<a href="${json.previous}">⏮️</a>`: "";
// console.log(json.previous);
// $nextLink = json.next? `<a href="${json.next}">⏭️</a>`: "";
// $links.innerHTML = $prevLink + ""+ $nextLink;

{/* <div class="card" style="width: 11rem;">

<div class="card-body">
<img src="${Marvel.data.results[0].thumbnail.path+routeExtenxionImg}" class="card-img-top" alt="">

    <h5 class="card-text">${Marvel.data.results[0].name}</h5>
    <h5 class="card-text">${Marvel.data.results[0].id}</h5>

</div> */}