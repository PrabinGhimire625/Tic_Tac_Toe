let boxes=document.querySelectorAll("#btn");   //access elememt
let reset_btn=document.querySelector("#reset");
let newGameBtn=document.querySelector("#new_btn");
let msgContainer=document.querySelector(".msg_container");
let msg=document.querySelector(".msg");
let turnO=true;   //playerX, playerO
let count = 0;    //To track a draw

const winPattern=[
    [0,1,2],
    [0,3,6],
    [0,4,8],
    [1,4,7],
    [2,5,8],
    [2,4,6],
    [3,4,5],
    [6,7,8]
]
boxes.forEach((btn) => {
    btn.addEventListener("click", () => {
        // console.log("Box was clicked");
        if (turnO) {
            btn.innerText = "O";
            turnO = false;
        } else {
            btn.innerText = "X";
            turnO = true;
        }
        btn.disabled = true;
        count++;

        let isWinner = checkWinner();
        if(count === 9 && !isWinner){
            gameDraw();
        }
    });
});

//disable other button if game is win on few step
const disableBtn = () => {
    for (let btn of boxes){
        btn.disabled=true;
    }
}

//enable button
const enableBtn = () => {
    for (let btn of boxes){
        btn.disabled=false;
        btn.innerText="";
    }
}

//reset the game
const resetGame=()=>{
    turnO=true;
    enableBtn();
    msgContainer.classList.add("hide");

}

//check draw game
const gameDraw = () => {
    msg.innerText = `Game was a Draw.`;
    msgContainer.classList.remove("hide");
    disableBtn();
  }; 


//show the winner
const showWinner = (winner) => {
    msg.innerText = `Congratulations, Winner is ${winner}`;
    msgContainer.classList.remove("hide");
    disableBtn();
};


//check the winner
const checkWinner = () => {
    for (let pattern of winPattern) {
        let pos1Val = boxes[pattern[0]].innerText;
        let pos2Val = boxes[pattern[1]].innerText;
        let pos3Val = boxes[pattern[2]].innerText;

        if (pos1Val !== "" && pos2Val !== "" && pos3Val !== "") {
            if (pos1Val === pos2Val && pos2Val === pos3Val) {
                // console.log("Winner", pos1Val);
                showWinner(pos1Val);              
            }
        }
    }
};



newGameBtn.addEventListener("click",resetGame);
reset_btn.addEventListener("click",resetGame);
