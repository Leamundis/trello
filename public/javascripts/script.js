if (document.querySelector('.btn-register')) {
    document.querySelector('.btn-register').addEventListener('click', () => {
        document.querySelector('#login-form').classList.add('hidden');
        document.querySelector('#register-form').classList.remove('hidden');
    });
}

if (document.querySelector('#btn-addBoard')) {
    document.querySelector('#btn-addBoard').addEventListener('click', () => {
        document.querySelector('#boadsList').classList.add('hidden');
        document.querySelector('#btn-addBoard').classList.add('hidden');
        document.querySelector('#newBoard').classList.remove('hidden');
    });
}


function loginCheck(event) {
    event.stopPropagation();
    event.preventDefault();
    let login = document.querySelector("#login").value;
    let password = document.querySelector("#password").value;
    let method = document.querySelector('#login-form form').getAttribute('method');

    fetch("/users/login", {
        credentials: 'same-origin',
        method: method,
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({login: login, password: password})
    })
    .then(res => res.text())
    .then(res => {
        if (res == "OK") {
            document.querySelector('#boardArea').classList.remove('hidden');
            document.querySelector('#displayLogin').classList.add('hidden');
            //loader();
        }
        //console.log(res)
    });
}

function newBoard() {
    debugger;
    event.stopPropagation();
    event.preventDefault();
    let tweet = document.querySelector('#newBoard form input').value;
    let method = document.querySelector('#newBoard form').getAttribute('method');

    fetch("/tweets", {
        credentials: 'same-origin',
        method: method,
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({tweet: tweet})
    })
    .then(res => res.text())
    .then(res => {
        if (res == "OK") {
            //io.connect('http://localhost:8080/');
            loader();
        }
    });
}

const loader = () => {
    if(document.querySelector('#btn-logout')) {
        fetch("/boards", {
            credentials: 'same-origin'
        })
        .then(res => res.json())
        .then(res => {
            if(res) {
                const boards = res;
                document.querySelector('.boardsArea').innerHTML = 'test';

                boards.forEach(board => {
                    
                });
            } else {
                // pas de board à afficher
            }
            //console.log(res);
        })
    }
}

document.body.onload = () => { loader() }