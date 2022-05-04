/*
canvas 위의 마우스 감지하기
*/
const canvas = document.getElementById("jsCanvas");
const ctx = canvas.getContext("2d");
const colors = document.getElementsByClassName("jsColor");
const range = document.getElementById("jsRange");
const mode = document.getElementById("jsMode");

// pixel manipulation 설정
canvas.width = document.getElementsByClassName("canvas")[0].offsetWidth;
canvas.height = document.getElementsByClassName("canvas")[0].offsetHeight;

// 기본 canvas-context 속성 설정
ctx.strokeStyle = "#2c2c2c"; // 라인 색상
ctx.lineWidth = 2.5; // 라인 두꼐

let painting = false;
let filling = false;

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

// 색상 선택 함수
function handleColorClick(event) {
    const color = event.target.style.backgroundColor;
    ctx.strokeStyle = color;
}

// 선 굵기 변경 함수
function handleRangeChange(event) {
    const size = event.target.value;
    ctx.lineWidth = size;
}

// 모드 변경 함수
function handleModeClick(event) {
    if (filling) {
        filling = false;
        mode.innerText = "fill";
    } else {
        filling = true;
        mode.innerText = "paint";
    }
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

Array.from(colors).forEach((clickedColor) =>
    clickedColor.addEventListener("click", handleColorClick)
);

if (range) {
    range.addEventListener("input", handleRangeChange);
}

if (mode) {
    mode.addEventListener("click", handleModeClick);
}
