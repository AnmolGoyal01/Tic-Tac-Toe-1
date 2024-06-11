let boxes = document.querySelectorAll(".game button");
let rst = document.querySelector(".reset");
let winnerMsg = document.querySelector(".winnerMsg");
let newGameBtn = document.querySelector(".newGame");
let turnX = true;
let counter = 0;



const winPattern =
[
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
];

newGameBtn.addEventListener("mouseover", ()=> {
    gsap.to(newGameBtn, {
        scale : 1.1,
        duration : 0.2
    })
})

newGameBtn.addEventListener("mouseleave" , ()=> {
    gsap.to(newGameBtn, {
        scale : 1,
        duration : .2,
    })
})
rst.addEventListener("mouseover", ()=> {
    gsap.to(rst, {
        scale : 1.1,
        duration : 0.2
    })
})

rst.addEventListener("mouseleave" , ()=> {
    gsap.to(rst, {
        scale : 1,
        duration : .2,
    })
})

rst.addEventListener("click",()=>{
    gsap.from(rst, {
        y : 4,

    });
    document.querySelector(".winner").classList.add("hidden");
    counter = 0;
    boxes.forEach(box => {
        turnX = true;
        box.innerText = "";
        box.disabled = false;
    });
})

newGameBtn.addEventListener("click",()=>{
    document.querySelector(".winner").classList.add("hidden");
    counter = 0;
    boxes.forEach(box => {
        turnX = true;
        box.innerText = "";
        box.disabled = false;  
    });
})

function showWinner(winner) {
    if (winner !== "draw") {
        let msg =  `Congrats ${winner} wins the Game`;
        winnerMsg.innerText = msg;
        for (const box of boxes) {
            box.disabled = true;
        }
        document.querySelector(".winner").classList.remove("hidden");
    }
    else {
        winnerMsg.innerText = `Game is Draw`;
        document.querySelector(".winner").classList.remove("hidden");
    }
}


function checkWinner() {
    for (const pattern of winPattern) {
        let p1 = boxes[pattern[0]].innerText;
        let p2 = boxes[pattern[1]].innerText;
        let p3 = boxes[pattern[2]].innerText;

        if (p1===p2 && p2===p3 && p3!=='') {
            showWinner(p1);
            break;
        }
    }
}

boxes.forEach(box => {
    box.addEventListener("mouseover" , ()=> {
        gsap.to(box, {
            scale : 1.1,
            duration : .1,
        })
    });
});

boxes.forEach(box => {
    box.addEventListener("mouseleave" , ()=> {
        gsap.to(box, {
            scale : 1,
            duration : .1,
        })
    });
});

boxes.forEach(box => {
    box.addEventListener("click", (event)=>{
        gsap.from(box, {
            opacity : 0.5,
            duration : .2,
        })
        gsap.to(box, {
            scale : 1,
            duration : 0.1
        })
        if (turnX) {
            box.innerText = "X";
            turnX = false;
        }
        else {
            box.innerText = "O";
            turnX = true;
        }
        box.disabled = true;
        counter++;
        checkWinner();
        if (counter == 9) {
            showWinner("draw");
        }
    })
});