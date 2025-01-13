let tentativi = 5;
let contatore = [   -1, -1, -1, -1];
let winArray = [Math.floor(Math.random()*6), Math.floor(Math.random()*6), Math.floor(Math.random()*6), Math.floor(Math.random()*6)];


function change (button) {
    let ColorsArray = ["red", "blue", "yellow", "green", "orange", "purple"];
    
    contatore[button] = (contatore[button] + 1) % 6 ;
    
    document.getElementById(`${button}`).style.backgroundColor = ColorsArray[contatore[button]];
    

}

function gioca() {

    if (contatore[0] === -1 || contatore[1] === -1 || contatore[2] === -1 || contatore[3] === -1) {
        alert('selezionare tutti i parametri di input');
        return;
    }
    
    if (contatore[0] === winArray[0] && contatore[1] === winArray[1] && contatore[2] === winArray[2] && contatore[3] === winArray[3]) {
        vittoria();
    } else {
        tentativi -= 1;
        document.getElementById('tentativi').innerHTML = `Tentativi rimasti: ${tentativi} `;   
        if (tentativi <= 0) {
            document.getElementById('sconfitta').style.display = 'block';
            return;
        }
        sconfitta();
    }
}

function sconfitta() {
    console.log('sconfitta');
    
    let previousGame = document.getElementById('currentGame');
    previousGame.id = '';
    previousGame.classList.add('game');

    // creo nuovo tentativo

    // creo tutti i contenitori
    let game = document.createElement('div');
    game.id = ('currentGame');
    document.getElementById('main').appendChild(game); 
   
    let guess = document.createElement('div');
    guess.classList.add('guess');
    game.appendChild(guess);

    let result = document.createElement('div'); 
    result.classList.add('result');
    game.appendChild(result);
    
    let result1 = document.createElement('div');
    result1.classList.add('result1');
    result.appendChild(result1);
    let result2 = document.createElement('div');
    result2.classList.add('result2');
    result.appendChild(result2);

    // creo bottoni
    
    for (let i = 0; i < 4; i++) {
        
        // dò indizi


        if (winArray[i] === contatore[i]) {
            document.getElementById(`${i.toString()}Res`).style.backgroundColor = '#4CAF50';
        } else {
            if (winArray.includes(contatore[i])) {
                document.getElementById(`${i.toString()}Res`).style.backgroundColor = '#FFD700';
            } else {
                document.getElementById(`${i.toString()}Res`).style.backgroundColor = '#FF5733';
            }
        }

        // disabilito bottoni precedenti
        document.getElementById(`${i.toString()}`).onclick = '';
        document.getElementById(`${i.toString()}`).id = '';
        document.getElementById(`${i.toString()}Res`).id = '';

        // creo nuovi bottoni
        let button = document.createElement('button');
        button.onclick = () => change(i);
        button.classList.add('ball');
        button.id = `${i.toString()}`;
        guess.appendChild(button);

        // creo bottoni risultato
        if (i < 2) {
            // pari
            let buttonRes = document.createElement('button');
            buttonRes.classList.add('ballRes');
            buttonRes.id = `${i.toString()}Res`;
            result1.appendChild(buttonRes);
        } else {
            // dispari
            let buttonRes = document.createElement('button');
            buttonRes.classList.add('ballRes');
            buttonRes.id = `${i.toString()}Res`;
            result2.appendChild(buttonRes);
        }


    }

    // reset contatore
    contatore = [-1, -1, -1, -1];





}

function vittoria() {
    document.getElementById('vittoria').style.display = 'block';
}

function reload() {
    location.reload();
}