let btn = document.getElementById("button");
let $main = document.querySelector("main");
let $links = document.querySelector(".links");
document.querySelector(".bars__menu").addEventListener("click", animateBars);
document.querySelector(".menu").addEventListener("click", animateBars);

var line1__bars = document.querySelector(".line1__bars-menu");
var line2__bars = document.querySelector(".line2__bars-menu");
var line3__bars = document.querySelector(".line3__bars-menu");
var items = document.querySelector(".menu");

function animateBars(){
    line1__bars.classList.toggle("activeline1__bars-menu");
    line2__bars.classList.toggle("activeline2__bars-menu");
    line3__bars.classList.toggle("activeline3__bars-menu");
    items.classList.toggle("active-menu");
}




let page = 0;
const cache = {};
    btn.addEventListener("click", async () => {
        let caja = document.getElementById("caja").value;
        let APIMovie = `https://gateway.marvel.com/v1/public/characters?name=${caja}&ts=1&apikey=324ec0083186bfcae492caad61761546&hash=2d2dba620258e467621323bb725ab2fd`;
        try {
            $main.innerHTML = `<img class="loader" src="./assets/loader.svg" alt="Cargando..."> `;
            let res = await fetch(APIMovie);
            let json = await res.json();
            loadTemplate(json.data.results);
        } catch (err) {
            let message = err.statusText || "Ocurrió un error";
            $main.innerHTML = `<p>Error ${err.status}: ${message}</p>`;
        }
    });



function loadNext() {
	page++;
	loadComics();
}
function loadPrev() {
	page--;
	loadComics();
}

// let marvelAPI = `https://gateway.marvel.com/v1/public/characters?offset=${offset}&limit=20&ts=1&apikey=324ec0083186bfcae492caad61761546&hash=2d2dba620258e467621323bb725ab2fd`;
// api1 https://gateway.marvel.com/v1/public/characters?offset=${offset}&limit=20&ts=1&apikey=324ec0083186bfcae492caad61761546&hash=2d2dba620258e467621323bb725ab2fd
// api1smailin240 https://gateway.marvel.com/v1/public/characters?ts=1&apikey=324ec0083186bfcae492caad61761546&hash=2d2dba620258e467621323bb725ab2fd
// Buscador   https://gateway.marvel.com/v1/public/characters?name=thor&ts=1&apikey=324ec0083186bfcae492caad61761546&hash=2d2dba620258e467621323bb725ab2fd
// api2Robles https://gateway.marvel.com/v1/public/comics?ts=1&apikey=4c37cbfce436ecdb67fca8aba42491ca&hash=54b8de1b7cab4600f9fd1effa11b75c7

async function loadComics() {
	try {
		let offset = page * 20;
		if (cache[`page${page}`]) {
			loadTemplate(cache[`page${page}`]);
			return;
		} else {
			let marvelAPI = `https://gateway.marvel.com/v1/public/characters?offset=${offset}&limit=20&ts=1&apikey=324ec0083186bfcae492caad61761546&hash=2d2dba620258e467621323bb725ab2fd`;
			$main.innerHTML = `<img class="loader" src="./assets/loader.svg" alt="Cargando..."> `;
			let res = await fetch(marvelAPI);
			let json = await res.json();
			cache[`page${page}`] = json.data.results;
			loadTemplate(json.data.results);
		}
	} catch (err) {
		let message = err.statusText || "Ocurrió un error";
		$main.innerHTML = `<p>Error ${err.status}: ${message}</p>`;
	}
}

async function loadTemplate(data) {
	let $template = "";
	let api ="apikey=324ec0083186bfcae492caad61761546&hash=2d2dba620258e467621323bb725ab2fd";
	let ts = "?ts=1&";
	let routeExtenxionImg = "/portrait_xlarge.jpg";
	for (let i = 0; i < data.length; i++) {
		try {
			let res = await fetch(data[i].resourceURI + ts + api),
				Marvel = await res.json();
			$template += `

		<div class="content">
		<a class="card" href="#!">
			<div class="front" style="background-image: url(${Marvel.data.results[0].thumbnail.path + routeExtenxionImg})">
				<p>${Marvel.data.results[0].name}</p>
			</div>
			<div class="back">
				<div>
					<p>${Marvel.data.results[0].description}</p>
					<p>Provident consectetur natus voluptatem quis tenetur sed beatae eius sint.</p>
					<button class="button" onclick="window.location.href='${Marvel.data.results[0].urls[0].url}'">Click me</button>

				</div>
			</div>
		</a>
		
	</div>
		
		
		`;
		} catch (err) {
			let message = err.statusText || "Ocurrió un error";
			$template += `
            <figure>
                <figcaption>Error ${err.status}: ${message}</figcaption>
            </figure>
                `;
		}
	}
	$main.innerHTML = $template;
}
document.addEventListener("DOMContentLoaded", loadComics());

// </div>
// <div class="card" style="width: 200px;">
// 	<img src="${Marvel.data.results[0].thumbnail.path + routeExtenxionImg}" class="card-img-top" alt="...">
// 		<div class="card-body">
// 			<h5 class="card-title">${Marvel.data.results[0].name}</h5>
// 			<p class="card-text">${Marvel.data.results[0].description}</p>
// 			<a href="${Marvel.data.results[0].urls[0].url}" class="btn btn-primary">Go somewhere</a>
// 		</div>
// </div>
// </div> 


// console.log(Marvel.data.results[0]);
// console.log(Marvel.data.results);
// console.log(Marvel.data.results[0].thumbnail.path+routeExtenxionImg);

// $prevLink = json.previous? `<a href="${json.previous}">⏮️</a>`: "";
// console.log(json.previous);
// $nextLink = json.next? `<a href="${json.next}">⏭️</a>`: "";
// $links.innerHTML = $prevLink + ""+ $nextLink;

{
	/* <div class="card" style="width: 11rem;">

<div class="card-body">
<img src="${Marvel.data.results[0].thumbnail.path+routeExtenxionImg}" class="card-img-top" alt="">

    <h5 class="card-text">${Marvel.data.results[0].name}</h5>
    <h5 class="card-text">${Marvel.data.results[0].id}</h5>

</div> */
}