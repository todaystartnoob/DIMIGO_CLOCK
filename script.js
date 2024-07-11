let is_memo_on = false;
let is_todolist_on = false;
// 텍스트 에리어
const daysOrder = ['mon', 'tue', 'wen', 'thu', 'fri', 'sat', 'sun'];

function init() {
    if (location.href.indexOf("token") === -1) {
        if (!localStorage.getItem("email") || localStorage.getItem("email") === '') {
            location.href = "./login.html";
        }
    }else {
        const token = location.href.split("?")[1].split("&").filter(e => e.split("=")[0] === "token")[0].split("=")[1];
        const dataBase64 = token.split(".")[1];
        const data = JSON.parse(window.atob(dataBase64)).data

        localStorage.setItem("email", data.email);
    }
}


// 배경 이미지 랜덤
document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('mainBody').style.backgroundImage = `url("https://picsum.photos/1920/1080?random=${Math.floor(Math.random() * 100)}")`
 });

document.addEventListener('DOMContentLoaded', function() {
    // 페이지 로드 시 기본적으로 MON의 메모를 표시하고 배경색 변경
    const defaultDay = document.querySelector('.mon');
    defaultDay.click();
    defaultDay.classList.add('active');

    // Add focus and blur event listeners to all memo textareas
    document.querySelectorAll('.memoText').forEach(textarea => {
        textarea.addEventListener('focus', function() {
            is_memo_on = true;
        });
        textarea.addEventListener('blur', function() {
            is_memo_on = false;
        });
    });

    // Add keydown event listener to handle arrow keys
    document.addEventListener('keydown', function(event) {
        if (!is_memo_on && !is_todolist_on && (event.key === 'ArrowDown' || event.key === 'ArrowUp')) {
            let currentDayElement = document.querySelector('.day.active');
            let currentIndex = daysOrder.indexOf(currentDayElement.classList[0]);
            let newIndex;

            if (event.key === 'ArrowDown') {
                newIndex = (currentIndex + 1) % daysOrder.length;
            } else if (event.key === 'ArrowUp') {
                newIndex = (currentIndex - 1 + daysOrder.length) % daysOrder.length;
            }

            let newDayElement = document.querySelector(`.${daysOrder[newIndex]}`);
            newDayElement.click();
        }
    });
});

document.querySelectorAll('.days .day').forEach(day => {
    day.addEventListener('click', function() {
        const dayName = this.querySelector('p').innerText.toLowerCase();
        
        document.querySelectorAll('.memoText').forEach(textarea => {
            if (textarea.id.startsWith(dayName)) {
                textarea.style.display = 'block';
            } else {
                textarea.style.display = 'none';
            }
        });

        document.querySelectorAll('.days .day').forEach(d => {
            d.classList.remove('active');
        });
        this.classList.add('active');
    });
});




// 배경 이미지 랜덤
function randombg(){
    const mainBody = document.getElementById('mainBody');
    mainBody.style.backgroundImage = `url("https://picsum.photos/1920/1080?random=${Math.floor(Math.random() * 100)}")`
    mainBody.style.backgroundColor = null;
}

document.addEventListener('keydown', function(event) {
    // 'u' 키의 키 코드는 85
    if (event.key === 't') { // 필요시 기본 동작 방지
        if(is_memo_on===false && is_todolist_on===false){
            event.preventDefault();
            randombg();
        }
    }
});


document.addEventListener('DOMContentLoaded', function() {
    var mainBody = document.getElementById('mainBody');
    var colorBox = document.getElementById('colorBox');
    
    // 초기 상태 설정
    if (!mainBody.style.backgroundColor || mainBody.style.backgroundColor === 'none') {
        colorBox.style.display = 'none';
    } else {
        colorBox.style.display = 'flex';
    }
});

// 배경색 랜덤
const ESC_KEYCODE = 27;
let keepRunning = false; // ESC 키 누름 상태를 나타내는 변수

// ESC 키를 눌렀을 때 실행할 함수
function handleKeyPress(event) {
    if (event.keyCode === ESC_KEYCODE) {
        if (!keepRunning) {
            keepRunning = true;
            change_color_random(); // 최초 호출
        }
    }
}

// ESC 키 이벤트 리스너 등록
document.addEventListener('keydown', handleKeyPress);

// getRandomColor 함수: 랜덤한 RGB 색상 값을 반환
function getRandomColor() {
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    return `rgb(${r}, ${g}, ${b})`;
}

// change_color_random 함수: 배경색과 이미지를 랜덤하게 변경
function change_color_random() {
    const mainBody = document.getElementById('mainBody');
    const randomColor = getRandomColor();

    // 0.5초 후에 배경색 변경
    setTimeout(function() {
        mainBody.style.backgroundColor = randomColor;
        mainBody.style.backgroundImage = 'none'; // 배경 이미지 제거

        // 다시 자신을 호출하여 무한 반복
        if (keepRunning) {
            change_color_random();
        }
    }, 500); // 500ms = 0.5초
}

// 페이지가 새로 고침되면 keepRunning을 false로 초기화
window.addEventListener('beforeunload', function() {
    keepRunning = false;
});

document.addEventListener('keydown', function(event) {
    // 'r' 키의 키 코드는 85
    if (event.key === 'r') { // 필요시 기본 동작 방지
        if(is_memo_on===false && is_todolist_on===false){
            event.preventDefault();
            change_color_random();
        }
    }
});


// 색상 복사
$('.hexcode').click(function() {
    // #mainBody의 배경 이미지의 색상 가져오기
    var backgroundColor = $('#mainBody').css('background-color');
    
    // RGB 색상을 Hex 코드로 변환하는 함수
    function rgbToHex(rgb) {
        // RGB 값을 추출합니다.
        var rgbArray = rgb.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
        
        // RGB 값을 hex 코드로 변환합니다.
        function hex(x) {
            return ("0" + parseInt(x).toString(16)).slice(-2);
        }
        
        // hex 코드로 변환된 색상을 반환합니다.
        return "#" + hex(rgbArray[1]) + hex(rgbArray[2]) + hex(rgbArray[3]);
    }
    
    // RGB 색상을 Hex 코드로 변환합니다.
    var hexCode = rgbToHex(backgroundColor);
    
    // 복사할 대상을 만듭니다 (임시 textarea)
    var tempTextArea = $('<textarea>');
    $('body').append(tempTextArea);
    tempTextArea.val(hexCode).select();
    
    // 복사 명령 실행
    document.execCommand('copy');
    
    // 임시 textarea 제거
    tempTextArea.remove();
    
    // 메시지 등을 통해 사용자에게 복사 완료를 알릴 수 있습니다
    alert('배경 색상 ' + 'Hex 코드가 ' + hexCode + ' (으)로 클립보드에 복사되었습니다.');
});

$('.rgb_color').click(function() {
    // #mainBody의 배경 이미지의 색상 가져오기
    var backgroundColor = $('#mainBody').css('background-color');
    
    // 복사할 RGB 색상 문자열 생성
    var rgbColor = 'rgb(' + backgroundColor.match(/\d+/g).join(', ') + ')';
    
    // 복사할 대상을 만듭니다 (임시 textarea)
    var tempTextArea = $('<textarea>');
    $('body').append(tempTextArea);
    tempTextArea.val(rgbColor).select();
    
    // 복사 명령 실행
    document.execCommand('copy');
    
    // 임시 textarea 제거
    tempTextArea.remove();
    
    // 메시지 등을 통해 사용자에게 복사 완료를 알릴 수 있습니다
    alert('배경 색상 ' + 'RGB 색상이 ' + rgbColor + ' (으)로 클립보드에 복사되었습니다.');
});

// 유튜브 영상

$(document).ready(function() {
    let on = false;
    let debounceTimeout = null;
    const debounceDelay = 705; // 2초 디바운스 딜레이

    function make_border(){
        if(on){
            document.getElementById('clockbg').style.border = '2px solid #000';
        }
        else{
            document.getElementById('clockbg').style.border = 'none';
        }
    }

    function slide_memo() {
        let menu = $('#memo_body');
        if (on === true) {
            menu.css('display', 'block').animate({
                left: '1%'
            }, 700); // 1초(1000ms)에 걸쳐 슬라이드 인
        } else {
            menu.animate({
                left: '-50vw'
            }, 700, function() {
                menu.css('display', 'none');
            }); // 1초(1000ms)에 걸쳐 슬라이드 아웃
        }
    }

    function slide_color() {
        let menu = $('#colorBox');
        if (on === true && document.getElementById('mainBody').style.backgroundColor) {
            menu.css('display', 'flex').animate({
                left: '5vw'
            }, 700); // 1초(1000ms)에 걸쳐 슬라이드 인
        } else {
            menu.animate({
                left: '-20vw' 
            }, 700, function() {
                menu.css('display', 'none');
            }); // 1초(1000ms)에 걸쳐 슬라이드 아웃
        }
    }

    function up_clock() {
        let menu = $('#clock_body');
        if (on === true) {
            menu.css('display', 'flex').animate({
                top: '8%'
            }, 700); // 1초(1000ms)에 걸쳐 슬라이드 인
        } else {
            menu.animate({
                top: '30%'
            }, 700); // 1초(1000ms)에 걸쳐 슬라이드 아웃
        }
    }

    function slide_explanation(){
        let menu = $('.guide');
        if (on === true) {
            menu.css('display', 'flex').animate({
                left: '2%'
            }, 700); // 1초(1000ms)에 걸쳐 슬라이드 인
        } else {
            menu.animate({
                left: '-30vw'
            }, 700); // 1초(1000ms)에 걸쳐 슬라이드 아웃
        }
    }

    function up_todolist(){
        let menu = $('.todolist');
        if (on === true) {
            menu.css('display', 'flex').animate({
                top: '45%'
            }, 700); // 1초(1000ms)에 걸쳐 슬라이드 인
        } else {
            menu.animate({
                top: '100vh'
            }, 700); // 1초(1000ms)에 걸쳐 슬라이드 아웃
        }
    }

    function toggleMenu() {
        let menu = $('#menu');
        if (on ===true) {
            menu.css('display', 'block').animate({
                right: '0px'
            }, 700); // 1초(1000ms)에 걸쳐 슬라이드 인
        } else {
            menu.animate({
                right: '-20vw'
            }, 700, function() {
                menu.css('display', 'none');
            }); // 1초(1000ms)에 걸쳐 슬라이드 아웃
        }
    }

    let lastSpace = 0;

    function toggleFunctionality() {
        if ((new Date()).getTime() - lastSpace > debounceDelay) {
            on = !on;
            lastSpace = (new Date()).getTime();
            slide_memo();
            up_clock();
            slide_explanation();
            up_todolist();
            toggleMenu();
            make_border();
            slide_color();
        }
    }
    
    $(document).keydown(function(event) {
        if (!is_memo_on && !is_todolist_on && event.key === ' ') {
            event.preventDefault(); // Prevent the default action of the space key (scrolling)
            toggleFunctionality();
        }
    });
    
    // Add a click event listener to the document
    $(document).click(function(event) {
        if (!is_memo_on && !is_todolist_on) {
            toggleFunctionality();
        }
    });
});

// to_do list
let inputBox = document.getElementById('inputField');  // 할 일 입력창
let addToDo = document.getElementById('addToDo');      // 버튼
let toDoList = document.getElementById('toDoList');    // 할 일 리스트창
let isLinethrough = 0


document.addEventListener('keydown', function(event) {
  if (event.keyCode === 13 && is_todolist_on) {
    var list = document.createElement('li');     // html 'li' 태그 만들기
    if (!inputBox.value)            // 할 일 입력창에 내용이 입력되지 않으면 alert 발생
      alert('내용을 입력해 주세요');
    else
    {
      list.innerText = inputBox.value;  // <li>입력된 할 일</li>
      toDoList.appendChild(list);       // 할 일 리스트창에 자식으로 붙이기
      inputBox.value= "";               // 할 일 입력창 초기화
    }
    list.addEventListener('click', function(){      // 만들어진 list에 클릭 이벤트가 발생하면 줄 긋기
      if (isLinethrough == 0){
        list.style.textDecoration = "line-through";
        isLinethrough = 1;
      }
      else{
        list.style.textDecoration = "none";
        isLinethrough = 0;
      }
    })
    list.addEventListener('dblclick', function(){   // list에 더블클릭 이벤트가 발생하면 할 일 리스트창에서 지우기
      toDoList.removeChild(list);
    })
  }
});

inputBox.addEventListener('focus', function() {
    is_todolist_on=true;
});

  // Remove Enter Key Event when inputBox is not focused
inputBox.addEventListener('blur', function() {
    is_todolist_on=false;
});




// 배경 이미지 바꾸기

document.getElementById('uploadImg').addEventListener('click', function() {
    document.getElementById('fileInput').click();
});

document.getElementById('fileInput').addEventListener('change', function(event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            document.getElementById('mainBody').style.backgroundImage = `url(${e.target.result})`;
            document.getElementById('mainBody').style.backgroundColor = 'none';
        };
        reader.readAsDataURL(file);
    }
});

document.addEventListener('keydown', function(event) {
    // 'u' 키의 키 코드는 85
    if (event.key === 'u') { // 필요시 기본 동작 방지
        if(is_memo_on===false && is_todolist_on===false){
            event.preventDefault();
            document.getElementById('uploadImg').click();
        }
    }
});


// 배경 색 바꾸기

function handlePaste(event) {
    const clipboardData = (event.clipboardData || window.clipboardData).getData('text').trim();
    const mainBody = document.getElementById('mainBody');

    // 정규식을 이용해 클립보드의 데이터가 RGB 값인지 또는 헥스 코드인지 확인
    const rgbPattern = /^\(?\s*\d{1,3}\s*,\s*\d{1,3}\s*,\s*\d{1,3}\s*\)?$/;
    const hexPattern = /^#?([0-9A-F]{3}){1,2}$/i;

    if (rgbPattern.test(clipboardData)) {
        mainBody.style.backgroundImage = 'none';
        // RGB 값일 경우 앞에 'rgb(' 와 ')'를 추가
        const formattedRgb = clipboardData.replace(/[^\d,]/g, '').trim(); // 숫자와 쉼표를 제외한 모든 문자 제거
        mainBody.style.backgroundColor = `rgb(${formattedRgb})`;
    } else if (hexPattern.test(clipboardData)) {
        mainBody.style.backgroundImage = 'none';
        // 클립보드 데이터가 '#' 없이 6자리 또는 3자리 헥스 코드인 경우 처리
        const color = clipboardData.startsWith('#') ? clipboardData : `#${clipboardData}`;
        mainBody.style.backgroundColor = color;
    }

    // 핸들러를 제거하여 한 번만 실행되도록 함
    document.removeEventListener('paste', handlePaste);
}

document.addEventListener('keydown', function(event) {
    // Ctrl+V 키가 눌렸을 때 처리
    if(is_memo_on===false && is_todolist_on===false){
        if (event.ctrlKey && event.key === 'v') {
            document.addEventListener('paste', handlePaste);
        }
    }

});


// 남은 시간
const weekdayTimetable = [{
    name: '심야 자습 1 타임',
    time: {
        start: {
            hour: 0,
            minute: 0
        },
        end: {
            hour: 0,
            minute: 50
        }
    }
},{
    name: '심야 자습 2 타임',
    time: {
        start: {
            hour: 1,
            minute: 0
        },
        end: {
            hour: 1,
            minute: 50
        }
    }
}, {
    name: '아침 기상',
    time: {
        start: {
            hour: 6,
            minute: 30
        },
        end: {
            hour: 7,
            minute: 40
        }
    }
}, {
    name: '아침 식사',
    time: {
        start: {
            hour: 7,
            minute: 40
        },
        end: {
            hour: 8,
            minute: 15
        }
    } 
}, {
    name: '아침자율학습',
    time: {
        start: {
            hour: 8,
            minute: 15
        },
        end: {
            hour: 8,
            minute: 50
        }
    }
}, {
    name: '아침 조회',
    time: {
        start: {
            hour: 8,
            minute: 50
        },
        end: {
            hour: 9,
            minute: 0
        }
    }
}, {
    name: '1교시',
    time: {
        start: {
            hour: 9,
            minute: 0
        },
        end: {
            hour: 9,
            minute: 50
        }
    }
}, {
    name: '쉬는시간',
    time: {
        start: {
            hour: 9,
            minute: 50
        },
        end: {
            hour: 10,
            minute: 0
        }
    }
}, {
    name: '2교시',
    time: {
        start: {
            hour: 10,
            minute: 0
        },
        end: {
            hour: 10,
            minute: 50
        }
    }
}, {
    name: '쉬는시간',
    time: {
        start: {
            hour: 10,
            minute: 50
        },
        end: {
            hour: 11,
            minute: 0
        }
    }
}, {
    name: '3교시',
    time: {
        start: {
            hour: 11,
            minute: 0
        },
        end: {
            hour: 11,
            minute: 50
        }
    }
}, {
    name: '쉬는시간',
    time: {
        start: {
            hour: 11,
            minute: 50
        },
        end: {
            hour: 12,
            minute: 0
        }
    }
}, {
    name: '4교시',
    time: {
        start: {
            hour: 12,
            minute: 0
        },
        end: {
            hour: 12,
            minute: 50
        }
    }
}, {
    name: '점심시간',
    time: {
        start: {
            hour: 12,
            minute: 50
        },
        end: {
            hour: 13,
            minute: 50
        }
    }
}, {
    name: '5교시',
    time: {
        start: {
            hour: 13,
            minute: 50
        },
        end: {
            hour: 14,
            minute: 40
        }
    }
}, {
    name: '쉬는시간',
    time: {
        start: {
            hour: 14,
            minute: 40
        },
        end: {
            hour: 14,
            minute: 50
        }
    }
}, {
    name: '6교시',
    time: {
        start: {
            hour: 14,
            minute: 50
        },
        end: {
            hour: 15,
            minute: 40
        }
    }
}, {
    name: '쉬는시간',
    time: {
        start: {
            hour: 15,
            minute: 40
        },
        end: {
            hour: 15,
            minute: 50
        }
    }
}, {
    name: '7교시',
    time: {
        start: {
            hour: 15,
            minute: 50
        },
        end: {
            hour: 16,
            minute: 40
        }
    }
}, {
    name: '청소 및 종례',
    time: {
        start: {
            hour: 16,
            minute: 40
        },
        end: {
            hour: 17,
            minute: 0
        }
    }
}, {
    name: '쉬는시간',
    time: {
        start: {
            hour: 17,
            minute: 0
        },
        end: {
            hour: 17,
            minute: 10
        }
    }
}, {
    name: '방과후 1타임',
    time: {
        start: {
            hour: 17,
            minute: 10
        },
        end: {
            hour: 17,
            minute: 50
        }
    }
}, {
    name: '쉬는시간',
    time: {
        start: {
            hour: 17,
            minute: 50
        },
        end: {
            hour: 17,
            minute: 55
        }
    }
}, {
    name: '방과후 2타임',
    time: {
        start: {
            hour: 17,
            minute: 55
        },
        end: {
            hour: 18,
            minute: 35
        }
    }
}, {
    name: '저녁식사',
    time: {
        start: {
            hour: 18,
            minute: 35
        },
        end: {
            hour: 19,
            minute: 50
        }
    }
}, {
    name: '야간자율학습 1타임',
    time: {
        start: {
            hour: 19,
            minute: 50
        },
        end: {
            hour: 21,
            minute: 10
        }
    }
}, {
    name: '쉬는시간',
    time: {
        start: {
            hour: 21,
            minute: 10
        },
        end: {
            hour: 21,
            minute: 30
        }
    }
}, {
    name: '야간자율학습 2타임',
    time: {
        start: {
            hour: 21,
            minute: 30
        },
        end: {
            hour: 22,
            minute: 50
        }
    }
}, {
    name: '수면 준비',
    time: {
        start: {
            hour: 22,
            minute: 50
        },
        end: {
            hour: 23,
            minute: 50
        }
    }
}];
const weekendTimetable = [{
    name: '아침 기상',
    time: {
        start: {
            hour: 7,
            minute: 0
        },
        end: {
            hour: 7,
            minute: 50
        }
    }
}, {
    name: '아침 식사',
    time: {
        start: {
            hour: 7,
            minute: 50
        },
        end: {
            hour: 8,
            minute: 10
        }
    }
}, {
    name: '인원 점검',
    time: {
        start: {
            hour: 8,
            minute: 50
        },
        end: {
            hour: 9,
            minute: 0
        }
    }
}, {
    name: '오전 1타임',
    time: {
        start: {
            hour: 9,
            minute: 0
        },
        end: {
            hour: 10,
            minute: 20
        }
    }
}, {
    name: '쉬는 시간',
    time: {
        start: {
            hour: 10,
            minute: 20
        },
        end: {
            hour: 10,
            minute: 40
        }
    }
}, {
    name: '오전 2타임',
    time: {
        start: {
            hour: 10,
            minute: 40
        },
        end: {
            hour: 12,
            minute: 0
        }
    }
}, {
    name: '점심 식사',
    time: {
        start: {
            hour: 12,
            minute: 0
        },
        end: {
            hour: 14,
            minute: 0
        }
    }
}, {
    name: '1차 자습',
    time: {
        start: {
            hour: 14,
            minute: 0
        },
        end: {
            hour: 16,
            minute: 0
        }
    }
}, {
    name: '쉬는 시간',
    time: {
        start: {
            hour: 16,
            minute: 0
        },
        end: {
            hour: 16,
            minute: 20
        }
    }
}, {
    name: '2차 자습',
    time: {
        start: {
            hour: 16,
            minute: 20
        },
        end: {
            hour: 18,
            minute: 0
        }
    }
}, {
    name: '저녁 식사',
    time: {
        start: {
            hour: 18,
            minute: 0
        },
        end: {
            hour: 20,
            minute: 0
        }
    }
}, {
    name: '야자 1타임',
    time: {
        start: {
            hour: 20,
            minute: 0
        },
        end: {
            hour: 21,
            minute: 0
        }
    }
}, {
    name: '쉬는 시간',
    time: {
        start: {
            hour: 21,
            minute: 0
        },
        end: {
            hour: 21,
            minute: 20
        }
    }
}, {
    name: '야자 2타임',
    time: {
        start: {
            hour: 21,
            minute: 20
        },
        end: {
            hour: 22,
            minute: 20
        }
    }
}, {
    name: '생활관 이동',
    time: {
        start: {
            hour: 22,
            minute: 20
        },
        end: {
            hour: 22,
            minute: 40
        }
    }
}];

const classSchedules = {
    1: ['', '', '','', '', '','(국어)','','(수학)','','(음악)','','(사회)','','(컴일)','','(수학)','','(자율)','','','','','','','','','','','',''],
    2: ['', '', '','','','','(체육)','','(수학)','','(플밍)','','(py)','','(영어)','','(국어)','','(과학)','','','','','','','','','','','',''],
    3: ['', '', '','','','','(플밍)','','(사회)','','(컴일)','','(진로)','','(음악)','','(동아리)','','(자습)','','','','','','','','','','','',''],
    4: ['', '', '','','','','(체육)','','(과학)','','(py)','','(국어)','','(컴일)','','(영어)','','(영어)','','','','','','','','','','','',''],
    5: ['', '', '','','','','(사회)','','(음악)','','(과학)','', '(컴일)', '','(진로)','', '(py)','', '(플밍)','','','','','','','','','','','','']
};

// 현재 시간
function updateTime() {
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const now = new Date();
    
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0'); // 월은 0부터 시작하므로 1 더함
    const date = String(now.getDate()).padStart(2, '0');
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    const day = days[now.getDay()];
    
    const ampm = hours >= 12 ? 'PM' : 'AM';
    const formattedHours = hours % 12 || 12; // 12시간 형식으로 변환

    const formattedTime = `${year}-${month}-${date} / ${formattedHours} : ${minutes} : ${seconds} ${ampm} / ${day}`;
    document.getElementById('timeDisplay').textContent = formattedTime;
}

// 페이지가 로드되면 시간을 업데이트하고, 이후 매초마다 업데이트
window.onload = function() {
    updateTime();
    setInterval(updateTime, 1000);
};

function getCurrentActivity() {
    const now = new Date();
    const currentHour = now.getHours();
    const currentMinute = now.getMinutes();
    const weekday = now.getDay(); // 0 = Sunday, 1 = Monday, etc.
    const isWeekend = (weekday === 0 || weekday === 6);
    const timetable = isWeekend ? weekendTimetable : weekdayTimetable;

    let currentActivity = null;
    let nextActivity = null;
    let currentClass = '';
    let nextClass = '';

    for (let i = 0; i < timetable.length; i++) {
        const activity = timetable[i];
        const start = activity.time.start;
        const end = activity.time.end;

        if ((currentHour > start.hour || (currentHour === start.hour && currentMinute >= start.minute)) &&
            (currentHour < end.hour || (currentHour === end.hour && currentMinute < end.minute))) {
            currentActivity = activity;
            nextActivity = timetable[(i + 1) % timetable.length];
            if (!isWeekend && classSchedules[weekday]) {
                currentClass = classSchedules[weekday][i]; // 각 교시를 대응
                nextClass = classSchedules[weekday][i+1]; // 각 교시를 대응
            }
            break;
        }
    }

    return { currentActivity, nextActivity, currentClass, nextClass };
}

function formatTimeRemaining(endHour, endMinute) {
    const now = new Date();
    const endTime = new Date();
    endTime.setHours(endHour, endMinute, 0, 0);

    const remainingTime = endTime - now;
    const hours = Math.floor(remainingTime / (1000 * 60 * 60));
    const minutes = Math.floor((remainingTime % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((remainingTime % (1000 * 60)) / 1000);

    return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}

function updateTimetable() {

    const { currentActivity, nextActivity, currentClass, nextClass } = getCurrentActivity();
    const weekday = new Date().getDay();
    const isWeekend = (weekday === 0 || weekday === 6);

    if (currentActivity) {
        const end = currentActivity.time.end;
        const remainingTime = formatTimeRemaining(end.hour, end.minute);
        document.getElementById('current-activity').innerText = `${remainingTime}`;
    } else {
        document.getElementById('current-activity').innerText = '00:00:00';
    }

    if (nextActivity) {
        const nextActivityName = isWeekend ? nextActivity.name : `${nextActivity.name} ${nextClass}`;
        document.getElementById('next-activity').innerText = `${nextActivityName} 까지 남은 시간`;
    } else {
        document.getElementById('next-activity').innerText = '다음 활동 없음';
    }
}

setInterval(updateTimetable, 1000);
updateTimetable();
init()