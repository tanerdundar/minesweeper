let column = 8;
let row = 8;
let area = row * column;
let id = 1
let container = document.getElementById('dene')
let mineFieldObjects = [];

for (let i = 1; i <= column; i++) {
    let columnsDiv = document.createElement("div");
    container.appendChild(columnsDiv)

    for (let j = 1; j <= row; j++) {

        let field = document.createElement("div")
        columnsDiv.appendChild(field)
        field.style.width = "50px"
        field.style.height = "50px"
        field.style.backgroundColor = "rgb(228, 218, 205)";
        field.style.borderRadius = "5px";
        field.style.borderStyle = "solid";
        field.id = "field" + id;
        field.x = i;
        field.y = j;
        field.isThereBomb = false;
        mineFieldObjects.push({
            id: id++,
            x: i,
            y: j,
            bomb: false,
        })
    }
}

container.style.width = column * 55 + "px";
container.style.height = row * 55 + "px";

for (let i = 0; i < Math.floor(((mineFieldObjects.length * 41) / 100) + 0.5);) {
    let bombId = Math.floor(Math.random() * (area))

    if (mineFieldObjects[bombId].bomb) {

    } else {
        let createBomb = document.createElement("i");
        createBomb.classList.add("fa-solid", "fa-bomb", "fa-2x")
        createBomb.style.opacity = "0.0"
        createBomb.style.marginTop = "10px"
        mineFieldObjects[bombId].bomb = true;
        let fieldWithBomb = document.getElementById("field" + (bombId + 1))
        fieldWithBomb.appendChild(createBomb)
        i++;
    }
}
for (let i = 0; i < area; i++) {
    let divButton = document.getElementById("field" + (i + 1))
    divButton.addEventListener('click', () => {
        if (mineFieldObjects[i].bomb) {
            let bombsField = mineFieldObjects.filter((item) => item.bomb == true)

            for (let j = 0; j < bombsField.length; j++) {

                let foundDiv = document.getElementById("field" + (bombsField[j].id))
                foundDiv.firstChild.style.opacity = "1.0"
            }
        }
    })
}

//Omer Faruk