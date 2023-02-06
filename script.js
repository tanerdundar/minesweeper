let column = 10;
let row = 10;
let area = row * column;
let id = 1
let container = document.getElementById('dene')
let mineFieldObjects = [];
container.style.width = column * 55 + "px";
container.style.height = row * 55 + "px";

for (let i = 1; i <= column; i++) {
    let columnsDiv = document.createElement("div");
    container.appendChild(columnsDiv)
    for (let j = 1; j <= row; j++) {
        let field = document.createElement("div")
        columnsDiv.appendChild(field)
        field.style.width = "45px"
        field.style.height = "45px"
        field.style.backgroundColor = "rgb(228, 218, 205)";
        field.style.borderRadius = "5px";
        field.style.borderStyle = "solid";
        field.style.position = "relative";
        field.id = "field" + id;
        field.x = i;
        field.y = j;
        field.isThereFlag = false;
        field.isThereBomb = false;
        mineFieldObjects.push({
            id: id++,
            x: i,
            y: j,
            bomb: false,
            flag: false,
        })
    }
}

for (let i = 0; i < Math.floor(((mineFieldObjects.length * 15) / 100) + 0.5);) {
    let bombId = Math.floor(Math.random() * (area))
    if (mineFieldObjects[bombId].bomb) {
    } else {
        let createBomb = document.createElement("i");
        createBomb.classList.add("fa-solid", "fa-bomb", "fa-2x")
        createBomb.style.opacity = "0.0"
        createBomb.style.marginTop = "10px"
        mineFieldObjects[bombId].bomb = true;
        let fieldWithBomb = document.getElementById("field" + (bombId + 1))
        fieldWithBomb.style.position = "relative"
        fieldWithBomb.appendChild(createBomb)
        i++;
    }
}
for (let i = 0; i < area; i++) {


    let flag = document.getElementById("field" + (i + 1))
    flag.addEventListener("contextmenu", function (e) {
        if (!(document.getElementById("field" + (i + 1))).isThereFlag) {
            e.preventDefault()
            document.getElementById("field" + (i + 1)).isThereFlag = true
            let createFlag = document.createElement("i");
            createFlag.classList.add("fa-solid", "fa-flag", "fa-2x")
            createFlag.style.color = "red"
            createFlag.style.marginTop = "10px"
            this.appendChild(createFlag)
        } else { }
    });

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
        } else {
            if (numberFinder(i) == 0) {
                backgroundChanger(i)
            } else {
                insideChanger(numberFinder(i), i)
            }
        }
    })
}

function numberFinder(i) {
    let fieldAroundX = mineFieldObjects.filter((item) => (item.x <= (mineFieldObjects[i].x + 1)) && (item.x >= (mineFieldObjects[i].x - 1)))
    let fieldAroundY = fieldAroundX.filter((item) => (item.y <= (mineFieldObjects[i].y + 1)) && (item.y >= (mineFieldObjects[i].y - 1)))
    let neighbourBombs = 0;
    for (let index = 0; index < fieldAroundY.length; index++) {
        if (fieldAroundY[index].bomb) {
            neighbourBombs++;
        }
    }

    return neighbourBombs;
}

// console.log(neighbourBombs)

function backgroundChanger(i) {
    let zeroBombDiv = document.getElementById("field" + mineFieldObjects[i].id)
    zeroBombDiv.style.backgroundColor = "rgb(247, 245, 242)"
    zeroBombDiv.style.borderColor = "rgb(247, 245, 242)";
}
function insideChanger(num, i) {
    let divWithBombNeighbour = document.getElementById("field" + mineFieldObjects[i].id)
    divWithBombNeighbour.innerHTML = num
    divWithBombNeighbour.style.fontSize = "40px"
}
function zeroBombDivs() {

}