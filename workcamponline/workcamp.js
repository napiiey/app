const parallax = document.getElementsByClassName('parallax');
const p_unit = 30;
let topbgScrolled = false;
window.addEventListener('scroll', parallax_move);

const fadeConts = document.querySelectorAll('.fade'); // フェードさせる要素の取得
const fadeContsRect = []; // 要素の位置を取得するための配列
const fadeContsTop = []; // 要素の位置を取得するための配列
const fadeContsBottom = [];
let windowY = window.pageYOffset; // ウィンドウのスクロール位置
let windowH = window.innerHeight; // ウィンドウの高さ
const remainder = 160; // ちょっとはみ出させる部分

// 要素の位置を取得
for (var i = 0; i < fadeConts.length; i++) {
    fadeContsRect.push(fadeConts[i].getBoundingClientRect());
}
for (var i = 0; i < fadeContsRect.length; i++) {
    fadeContsTop.push(fadeContsRect[i].top + windowY);
}
for (var i = 0; i < fadeContsRect.length; i++) {
    fadeContsBottom.push(fadeContsRect[i].bottom + windowY);
}

function parallax_move() {
    if (topbgScrolled) return;
    topbgScrolled = true;
    setTimeout(() => {
        topbgScrolled = false;
    }, 100);
    parallax_topbg();
    leftFadeIn();
}

function parallax_topbg() {
    console.log('parallax move');
    const win_t = window.pageYOffset;
    const win_b = window.innerHeight + window.pageYOffset;
    [...parallax].forEach(el => {
        const el_y = el.getBoundingClientRect().top + window.pageYOffset;
        const el_b = el_y + el.clientHeight;
        if (el_y < win_b && el_b > window.pageYOffset) { //要素の一部が画面内にある
            const el_h = win_b - el_y;
            el.animate({
                transform: [el.style.transform, `translateY(-${el_h*el.dataset.parallax}px)`]
            }, {
                duration: 200,
                fill: 'forwards'
            });
        }
    });
}

const leftFadeIn = function() {
    windowY = window.pageYOffset;

    for (let i = 0; i < fadeConts.length; i++) {
        // 要素が画面の下端にかかったら
        if (windowY > fadeContsTop[i] - windowH + remainder && windowY < fadeContsBottom[i] - 120) {
            // .showを付与
            fadeConts[i].classList.add('show');
        } else {
            // 逆に.showを削除
            fadeConts[i].classList.remove('show');
        }
        // if (windowY < fadeContsTop[i] - remainder) {
        //     // .showを付与
        //     fadeConts[i].classList.remove('show');
        // } else {
        //     // 逆に.showを削除
        //     // fadeConts[i].classList.remove('show');
        // }
    }
}

//OS判定
const userAgent = window.navigator.userAgent.toLowerCase();

if(userAgent.indexOf("windows nt") !== -1) {
  console.log("「Microsoft Windows」をお使いですね!");
} else if(userAgent.indexOf("android") !== -1) {
  console.log("「Android」をお使いですね!");
} else if(userAgent.indexOf("iphone") !== -1 || userAgent.indexOf("ipad") !== -1) {
  console.log("「iOS」をお使いですね!");
} else if(userAgent.indexOf("mac os x") !== -1) {
  console.log("「macOS」をお使いですね!");
} else {
  console.log("何をお使いなのですか?");
}