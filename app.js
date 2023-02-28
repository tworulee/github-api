// elementleri secme

const githubForm = document.getElementById("github-form");
const nameInput = document.getElementById("githubname");
const clearLastUsers = document.getElementById("clear-last-users");
const lastUsers = document.getElementById("last-users");


const github = new Github();
const ui = new UI();

eventListeners();

function eventListeners() {

    githubForm.addEventListener("submit", getData);
    clearLastUsers.addEventListener("click", clearAllSearched);
    lastUsers.addEventListener("DOMContentLoaded", getAllSearched);


}

function getData(e) {

    let username = nameInput.value.trim();

    if (username === "") {
        alert("lütfen gecerli bir kullanıcı adı girin");
    } else {
        github.getGithubData(username)
            .then(response => {
                if (response.user.message === "Not Found") {
                    ui.showError("kullanıcı bulunamadı");
                } else {
                    ui.addSearchedUserToUI(username);
                    Storage.addSearchedUserToStorage(username);
                    ui.showUserInfo(response.user);
                    ui.showRepoInfo(response.repo);
                }
            })
            .catch(err => ui.showError(err));
    }


    ui.clearInput(); //input temizleme
    e.preventDefault();
}

function clearAllSearched() {
    //tüm arananları temizle

    if (confirm("emin misin")) {
        //silme
        Storage.clearAllSearchedUsersFromStorage();
        ui.clearAllSearchedFromUI();
    }

}

function getAllSearched() {
    // aranannları storageden al ui ekle

    let users = Storage.getSearchedUsersFromStorage();

    let result = "";
    users.forEach(user => {

        result += `<li class="list-group-item">${user}</li>`;

    });
    lastUsers.innerHTML = result;

}