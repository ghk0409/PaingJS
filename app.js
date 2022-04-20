/*
canvas 위의 마우스 감지하기
*/
const canvas = document.getElementById("jsCanvas");
const ctx = canvas.getContext("2d");

// pixel manipulation 설정
canvas.width = document.getElementsByClassName("canvas")[0].offsetWidth;
canvas.height = document.getElementsByClassName("canvas")[0].offsetHeight;

// 기본 canvas-context 속성 설정
ctx.strokeStyle = "#2c2c2c"; // 라인 색상
ctx.lineWidth = 2.5; // 라인 두꼐

let painting = false;

// 페인팅 중지 함수
function stopPainting() {
    painting = false;
}

// 페인팅 진행 함수
function startPainting() {
    painting = true;
}

// 마우스 움직일 시 함수
function onMouseMove(event) {
    const x = event.offsetX;
    const y = event.offsetY;
    // if: 마우스 클릭 상태 X, else: 마우스 클릭 상태 O
    if (!painting) {
        ctx.beginPath();
        ctx.moveTo(x, y);
    } else {
        ctx.lineTo(x, y);
        ctx.stroke(); // 선긋기
    }
}

// 마우스 클릭 시 함수
function onMouseDown(event) {
    painting = true;
}

if (canvas) {
    // 마우스 움직일 때 이벤트
    canvas.addEventListener("mousemove", onMouseMove);
    // 마우스 클릭할 때 이벤트
    canvas.addEventListener("mousedown", startPainting);
    // 마우스 클릭 후 땔 때 이벤트
    canvas.addEventListener("mouseup", stopPainting);
    // 마우스가 canvas 벗어날 때 이벤트
    canvas.addEventListener("mouseleave", stopPainting);
}
