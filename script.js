let startBtn;

for (let i = 1; i < 5; i++) {
    startBtn = document.getElementById("levBtn" + (i))
    startBtn.addEventListener("click", () => {
        document.getElementById('dene').style.opacity = "1.0"
        document.getElementById("out").style.opacity = "0.0"
        if (i == 1) {
            game(6, 6, 15) //  5
        } else if (i == 2) {
            game(9, 10, 20) // 18
        } else if (i == 3) {
            game(12, 12, 26) //  37
        }
        else {
            game(16, 15, 33) // 79
        }
    })
}
let counter = 0;

function game(column, row, rate) {

    let area = row * column;
    let remaining = area - counter;
    let id = 1
    let bombNumberDiv = document.getElementById('bombCount')
    let container = document.getElementById('dene')
    let bombDiv = bombCounter();
    let mineFieldObjects = [];
    container.style.width = column * 55 + "px";
    container.style.height = row * 55 + "px";
    container.style.borderRadius = "5px"
    bombNumberDiv.appendChild(bombDiv);



    for (let i = 1; i <= column; i++) {
        let columnsDiv = document.createElement("div");
        container.appendChild(columnsDiv)
        for (let j = 1; j <= row; j++) {
            let field = document.createElement("div")
            columnsDiv.appendChild(field)
            field.style.width = "45px"
            field.style.height = "45px"
            field.style.backgroundColor = "rgb(228, 218, 205)";
            //  field.style.borderRadius = "25px";
            field.style.borderStyle = "solid";
            field.style.position = "relative";
            field.id = "field" + id;
            field.x = i;
            field.y = j;
            field.isThereBomb = false;
            field.isChangeable = true;
            mineFieldObjects.push({
                id: id++,
                x: i,
                y: j,
                bomb: false,
                changeable: true
            })
        }
    }
    let bombNumber = (Math.floor(((mineFieldObjects.length * rate) / 100) + 0.5))
    const constBombNumber = bombNumber
    bombDiv.innerText = bombNumber

    for (let i = 0; i < bombNumber;) {
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
            e.preventDefault()
            if (flag.isChangeable) {
                let color = flag.style.backgroundColor;
                flag.style.backgroundColor = (("red" == color) ? "rgb(228, 218, 205)" : "red")
                bombNumber = (("red" == color) ? bombNumber + 1 : bombNumber - 1)
                bombDiv.innerText = bombNumber
            }
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
                for (let i = 0; i < area; i++) {
                    let divs = document.getElementById("field" + (i + 1))
                    divs.isChangeable = false
                    mineFieldObjects[i].changeable = false
                }
                let mypopup = document.getElementById('popUp');
                let close = document.getElementById("close");
                mypopup.style.display = "block";

                close.onclick = function () {
                    location.reload();
                }

                const replay = document.getElementById("replayButton")
                replay.addEventListener("click", () => {
                    location.reload();
                })
                const check = document.getElementById("checkButton")
                let alert = document.getElementById("alert")
                check.addEventListener("click", () => {
                    mypopup.style.display = "none";
                    alert.style.display = "block";

                })

            } else {
                recursiveTrial(mineFieldObjects[i])
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
    function backgroundChanger(i) {
        let zeroBombDiv = document.getElementById("field" + mineFieldObjects[i].id)
        if (zeroBombDiv.isChangeable) {
            if (zeroBombDiv.style.backgroundColor == "red") {
                bombsRedDeleter()
            }
            zeroBombDiv.style.backgroundColor = "rgb(192, 176, 152)"

        }
    }
    function insideChanger(num, i) {
        let divWithBombNeighbour = document.getElementById("field" + mineFieldObjects[i].id)
        if (divWithBombNeighbour.isChangeable) {
            if (divWithBombNeighbour.style.backgroundColor == "red") {
                bombsRedDeleter()
            }
            divWithBombNeighbour.innerHTML = num
            divWithBombNeighbour.isChangeable = false;
            counter++

            switch (num) {
                case 2: divWithBombNeighbour.style.color = "rgb(248, 94, 120)"; break;
                case 4: divWithBombNeighbour.style.color = "rgb(255, 179, 39)"; break;
                case 1: divWithBombNeighbour.style.color = "rgb(84, 84, 255)"; break;
                case 3: divWithBombNeighbour.style.color = "rgb(25, 128, 25)"; break;
                case 5: divWithBombNeighbour.style.color = "rgb(185, 7, 7)"; break;
                case 6: divWithBombNeighbour.style.color = "rgb(236, 95, 118)"; break;
                case 7: divWithBombNeighbour.style.color = "rgb(222, 57, 57)"; break;
                case 8: divWithBombNeighbour.style.color = "yellow"; break;
            }
            divWithBombNeighbour.style.borderColor = "black";
            divWithBombNeighbour.style.backgroundColor = "rgb(228, 218, 205)";
            divWithBombNeighbour.style.fontSize = "40px"

            if (area - counter == constBombNumber) {
                gameFinisher()

            }

        }
    }
    let checkedDivs = [];
    function recursiveTrial(param) {
        if (param.bomb || checkedDivs.some((idNumber) => idNumber == param.id))
            return;
        checkedDivs.push(param.id)
        let i = param.id - 1

        if (numberFinder(i) == 0) {
            backgroundChanger(i)

            // Down
            if (param.y < row && param.id < area && param.id >= 1) {
                recursiveTrial(mineFieldObjects.filter((item) => item.id == param.id + 1)[0])
            }
            // Up
            if (param.y > 1 && param.id <= area && param.id > 1) {
                recursiveTrial(mineFieldObjects.filter((item) => item.id == param.id - 1)[0])
            }
            // Right
            if (param.x < column && param.id < area && param.id >= 1) {
                recursiveTrial(mineFieldObjects.filter((item) => item.id == param.id + row)[0])
            }
            // Left
            if (param.x > 1 && param.id <= area && param.id > 1) {
                recursiveTrial(mineFieldObjects.filter((item) => item.id == param.id - row)[0])
            }
            // Left - Up
            if (param.y > 1 && param.x > 1 && param.id <= area && param.id > 1) {
                recursiveTrial(mineFieldObjects.filter((item) => item.id == param.id - (row + 1))[0])
            }
            // Left - Down
            if (param.y < row && param.x > 1 && param.id < area && param.id > 1) {
                recursiveTrial(mineFieldObjects.filter((item) => item.id == param.id - (row - 1))[0])
            }
            // Right - Up
            if (param.y > 1 && param.x < column && param.id < area && param.id > 1) {
                recursiveTrial(mineFieldObjects.filter((item) => item.id == param.id + (row - 1))[0])
            }
            // Right - Down
            if (param.y < row && param.x < column && param.id < area && param.id >= 1) {
                recursiveTrial(mineFieldObjects.filter((item) => item.id == param.id + (row + 1))[0])
            }
            let divThatHasToBeChanged = document.getElementById("field" + param.id)
            divThatHasToBeChanged.isChangeable = false;
            counter++
            if (area - counter == constBombNumber) {
                gameFinisher()
            }
        } else {
            insideChanger(numberFinder(i), i)
        }
    }
    function bombCounter() {
        let bombCounterDiv = document.createElement("div");
        bombCounterDiv.style.width = "200px"
        bombCounterDiv.style.height = "50px";
        bombCounterDiv.style.backgroundColor = "rgba(145, 145, 186, 0.685)";
        bombCounterDiv.style.borderRadius = "5px"
        bombCounterDiv.style.fontSize = "35px"
        return bombCounterDiv;
    }
    function bombsRedDeleter() {
        bombNumber++;
        bombDiv.innerText = bombNumber
    }
    function gameFinisher() {
        console.log("game finished")
        let mypopup2 = document.getElementById('popUp2');
        let close2 = document.getElementById("close2");
        mypopup2.style.display = "block";

        close2.onclick = function () {
            location.reload();
        }

        const replay2 = document.getElementById("replayButton2")
        replay2.addEventListener("click", () => {
            location.reload();
        })
    }
}
