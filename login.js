// 배경 이미지 랜덤
document.addEventListener('DOMContentLoaded', function() {
   document.getElementById('mainBody').style.backgroundImage = `url("https://picsum.photos/1920/1080?random=${Math.floor(Math.random() * 100)}")`
});


document.getElementById("Login").addEventListener('click', function(){
   location.href = "https://auth.dimigo.net/oauth?client=668dc5a208de1c0525995233&redirect=https://todaystartnoob.github.io/DIMIGO_CLOCK/index.html";
});

