/*
canvas 위의 마우스 감지하기
*/
const canvas = document.getElementById("jsCanvas");
const ctx = canvas.getContext("2d");
const colors = document.getElementsByClassName("jsColor");
const range = document.getElementById("jsRange");
const mode = document.getElementById("jsMode");
const clear = document.getElementById("jsClear");
const save = document.getElementById("jsSave");

const INITAIL_COLOR = "#2c2c2c";

// pixel manipulation 설정
canvas.width = document.getElementsByClassName("canvas")[0].offsetWidth;
canvas.height = document.getElementsByClassName("canvas")[0].offsetHeight;

// canvas 초기 배경색 설정(흰색)
ctx.fillStyle = "white";
ctx.fillRect(0, 0, canvas.width, canvas.height);

// 기본 canvas-context 속성 설정
ctx.strokeStyle = INITAIL_COLOR; // 라인 색상
ctx.fillStyle = INITAIL_COLOR; // 채우기 색상
ctx.lineWidth = 2.5; // 라인 두꼐

let painting = false;
let filling = false;

// 페인팅 중지 함수
function stopPainting() {
    painting = false;
}

// 페인팅 진행 함수 - 마우스 왼쪽 클릭 시에만
function startPainting(event) {
    if (event.which == 1) {
        painting = true;
    } else {
        alert("마우스 왼쪽 버튼으로 그려주세요!!");
    }
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
    ctx.fillStyle = color;
}

// 선 굵기 변경 함수
function handleRangeChange(event) {
    const size = event.target.value;
    ctx.lineWidth = size;
}

// 모드 변경 함수
function handleModeClick() {
    if (filling) {
        filling = false;
        mode.innerText = "fill";
    } else {
        filling = true;
        mode.innerText = "paint";
    }
}

// 캔버스 채우기 함수
function handleCanvasClick() {
    if (filling) {
        ctx.fillRect(0, 0, canvas.width, canvas.height);
    }
}

// 캔버스 지우기 함수
function handleClearClick() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

// 캔버스 우클릭 방지 함수
function handleRightClick(event) {
    event.preventDefault();
}

// 캔버스 저장 함수 (.png 포맷)
function handleSaveClick() {
    const image = canvas.toDataURL();
    const link = document.createElement("a");
    link.href = image;
    link.download = "OngsPaintCanvas[EXPORT]";
    link.click();
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
    // filling == tru일 경우, 클릭 시 채우기 이벤트
    canvas.addEventListener("click", handleCanvasClick);
    // 우클릭 방지 이벤트
    canvas.addEventListener("contextmenu", handleRightClick);
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

if (clear) {
    clear.addEventListener("click", handleClearClick);
}

if (save) {
    save.addEventListener("click", handleSaveClick);
}
