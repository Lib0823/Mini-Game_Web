var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');

canvas.width = window.innerWidth - 100;
canvas.height = window.innerHeight - 100;

var dinoImg = new Image();
dinoImg.src = './sin.PNG';
var dino = { //공룡 등장 좌표
    x : 100,
    y : 270,    
    width : 100,
    height : 100,
    draw() {    //네모 그리는 코드
        ctx.fillStyle = 'green';    
        ctx.fillRect(this.x, this.y, this.width, this.height);
        ctx.drawImage(dinoImg, this.x, this.y);
    }
}
//dino.x = 100; -> 이동하긴 하지만 애니메이션이 아님

var cactusImg = new Image();
cactusImg.src = './ddong.jpg';
class Cactus {  
    constructor() {
        this.x = 1300;
        this.y = 300;
        this.width = 50;
        this.height = 50;
    }
    draw() {
        ctx.fillStyle = 'red';
        ctx.fillRect(this.x, this.y, this.width, this.height);  
        ctx.drawImage(cactusImg, this.x, this.y);
    }
}

var jumpscore = 0;
var score = {
    x : 1290,
    y : 90,    
    scoreDraw() {    //네모 그리는 코드
        ctx.fillStyle = 'rgb(107, 1, 236)';   
        ctx.font = "bold 35px sans-serif";
        ctx.fillText(jumpscore, this.x, this.y);
    }
}

var timer = 0;
var cactusArr = [];
var jumpTimer = 0;
var animation;
var reJumpingTimer = 0;

function frame() { //1초에 60번 실행됨  (프레임마다 실행할거)
    animation = requestAnimationFrame(frame);
    timer++;  

    //그림 그리기전에 캔버스 지우기
    ctx.clearRect(0,0, canvas.width, canvas.height);
    
    if (timer % 180 === 0) {         //250프레임마다 장애물 그림
        var cactus = new Cactus();   //장애물 스폰
        cactusArr.push(cactus);      //장애물 동시에 여러개 보이게 배열에 넣음
    }

    cactusArr.forEach((a, i, o)=> {   //반복문으로 여러개 장애물 한 번에 그림
        if (a.x < 0) {
            o.splice(i, 1)
        }
        a.x -= 4;       //한 프레임마다 x좌표 4씩 이동, 장애물 속도
        
        collision(dino, a);    //충돌 체크
        //공룡 vs 모든 장애물 충돌체크 해야하므로 반복문 안에 넣음

        a.draw();
    })

    if (jumping == true) {  //점프 시키기
        dino.y-= 2;
        jumpTimer+= 2;
        reJumpingTimer += 2;  
    }
    if (jumpTimer > 150) {  //점프 타이머, 점프 후 100프레임 증가하면 멈춤
        jumping = false;    //점프 중단
        jumpTimer = 0;
    }
    if (jumping == false) { //점프 후에 다시 내려오기
        if (dino.y < 270) { //땅 높이 걸어주기 - 위에서부터 200픽셀 넘어가면 (높이가 300 넘어가면)
            dino.y+= 2;
            if (dino.y == 270) {
                reJumpingTimer = 0;   
            }
        }
    }
    score.scoreDraw();
    dino.draw()
}
frame();


//충돌 확인
function collision(dino, cactus) {
    var xSubtraction = cactus.x - (dino.x + dino.width);
    var ySubstraction = cactus.y - (dino.y + dino.height);
    if ( xSubtraction < 0 && ySubstraction < 0) {   //충돌하면
        ctx.clearRect(0,0, canvas.width, canvas.height);
        cancelAnimationFrame(animation);  //애니메이션 중지, 게임 중단
        
        alert("GAME OVER!");
    }
    if(xSubtraction != 0 && ySubstraction != 0) {
        if (timer % 180 === 0) {
            jumpscore += 50;
        }
    }
}


var jumping = false;  //점프 스위치 (점프중)  
document.addEventListener('keydown', function(e) {
    if (e.code === 'Space') {
        if (reJumpingTimer == 0) {    //점프 하는동안 재점프 못함
        //dino.y -= 2;    //1초에 60번정도 2 빼줌 = 점프
             jumping = true; //위에 if문 실행
        }
    }
});
