if (document.querySelector('.btn-register')) {
    document.querySelector('.btn-register').addEventListener('click', () => {
        document.querySelector('#login-form').classList.add('hidden');
        document.querySelector('#register-form').classList.remove('hidden');
    });
}

if (document.querySelector('#boardsList')) {
    document.querySelector('#boardsList').addEventListener('click', (el) => {
        el = el.target;
        if(el.id !== '') {
            id = el.id;
        } else if (el.parentElement.id !== '') {
            id = el.parentElement.id;
        }
        fetch("/boards/" + id, {
            credentials: 'same-origin'
        })
        .then(res => res.json())
        .then(res => {
            id = res._id;
            name = res.name;
            document.querySelector('#boardsList').classList.add('hidden');
            document.querySelector('#newBoard').classList.add('hidden');
            document.querySelector('#oneBoard').classList.remove('hidden');
            document.querySelector('#oneBoardName').innerHTML = name;
        })
    });
}

if (document.querySelector('#btn-addBoard')) {
    document.querySelector('#btn-addBoard').addEventListener('click', () => {
        document.querySelector('#boardsList').classList.add('hidden');
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
    event.stopPropagation();
    event.preventDefault();
    let board = document.querySelector('#newBoard form input').value;
    let method = document.querySelector('#newBoard form').getAttribute('method');

    fetch("/boards", {
        credentials: 'same-origin',
        method: method,
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({board: board})
    })
    .then(res => res.text())
    .then(res => {
        if (res == "OK") {
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
            if(res.length > 0) {
                const boards = res;
                document.querySelector('#boardsList').innerHTML = '';
                boards.forEach(board => {
                    let div = document.createElement("div");
                    div.setAttribute("id", board._id);
                    div.setAttribute("class", 'card col-2 id' + board._id);
                    document.querySelector('#boardsList').appendChild(div);

                    let emptyDiv = document.createElement("div");
                    emptyDiv.setAttribute("class", 'col-1');
                    document.querySelector('#boardsList').appendChild(emptyDiv);

                    let name = document.createElement("div");
                    name.setAttribute("class", 'card-body');
                    name.innerHTML = board.name;
                    document.querySelector('.id' + board._id).appendChild(name);
                });
                document.querySelector('#boardsList').classList.remove('hidden');
                document.querySelector('#btn-addBoard').classList.remove('hidden');
                document.querySelector('#newBoard').classList.add('hidden');
            } else {
                document.querySelector('#boardsList').innerHTML = 'Vous n\'avez pas encore de tableau. N\'héssitez pas à tester le gros button bleu ci-dessus!';
            }
            //console.log(res);
        })
    }
}

document.body.onload = () => { loader() }