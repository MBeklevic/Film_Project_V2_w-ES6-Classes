const form = document.getElementById("film-form");
const titleElement = document.querySelector("#title");
const directorElement = document.querySelector("#director");
const urlElement = document.querySelector("#url");
const secondCardBody = document.querySelectorAll(".card-body")[1];
const clear = document.getElementById("clear-films");




// Tüm Eventleri Yükleme:

addEventlisteners();

function addEventlisteners() {
    form.addEventListener("submit", addFilm);
    document.addEventListener("DOMContentLoaded", function () {
        let films = Storage.getFilmsFromStorage();
        UI.loadAllFilms(films); //Sayfamız yüklendiğinde daha önceden storage a eklediğimiz filmleri arayüzümüze ekliyoruz.
    });

    secondCardBody.addEventListener("click", deleteFilm);
    clear.addEventListener("click", clearAllFilms);
}
function addFilm(e) {
    const title = titleElement.value;
    const director = directorElement.value;
    const url = urlElement.value;

    if (title === "" || director === "" || url === "") {
        // Hata mesajı
        UI.displayMessages("Tüm alanları doldurun!!!", "danger");
    }
    else {
        // Yeni film oluşturma 
        // console.log("Deneme");
        const newFilm = new Film(title, director, url);

        UI.addFilmToUI(newFilm); //Arayüze Film Ekleme
        Storage.addFilmToStorage(newFilm); //Storage a film ekleme.
        UI.displayMessages("Film başarıyla eklendi!", "success");

    }

    UI.clearInputs(titleElement, directorElement, urlElement);




    e.preventDefault();
}

function deleteFilm(e) {
    if (e.target.id === "delete-film") {
        UI.deleteFilmFromUI(e.target);
        Storage.deleteFilmFromStorage(e.target.parentElement.previousElementSibling.previousElementSibling.textContent); //anchor tag imizde parentına yani td ye gittik sonra 2 üstteki kardeşine gidip text contentini aldık.
        UI.displayMessages("Silme işlemi başarılı", "success");
    }

}

function clearAllFilms(e) {
    if (confirm("Emin Misiniz?")) {
        UI.clearAllFilmsFromUI();
        Storage.clearAllFilmsFromStorage();
        UI.displayMessages("Silme işlemi başarılı", "success");
    }
}
