document.addEventListener('DOMContentLoaded', () => {
    const popup = document.getElementById('cookie-popup');
    const acceptButton = document.getElementById('continue');
    const declineButton = document.getElementById('decline-cookies');
    const accept = document.getElementById('accept');
    const ad = document.getElementById('bouncing-ad');
    const answer = document.getElementById('findprincessAnswer');
    const princessImage = document.getElementById('princessImage');
    const princessXl = document.getElementById('findprincessxl');
    const princessLg = document.getElementById('findprincesslg');
    const princessSm = document.getElementById('findprincesssm');
    const princessAns = document.getElementById('findprincessAnswer');
    const farSound = document.getElementById('farSound');
    const normalSound = document.getElementById('normalSound');
    const nearSound = document.getElementById('nearSound');
    const veryNearSound = document.getElementById('veryNearSound');

    // Initial position and speed (in pixels per frame)
    let posX = 0;
    let posY = 0;
    let speedX = 3;  // Horizontal speed
    let speedY = 3.5; // Vertical speed (slightly different for an interesting bounce)

    // Frame update function
    function moveAd() {
        // 1. Get current window and ad dimensions
        const windowWidth = window.innerWidth;
        const windowHeight = window.innerHeight;
        const adWidth = ad.offsetWidth;
        const adHeight = ad.offsetHeight;

        // 2. Update position based on current speed
        posX += speedX;
        posY += speedY;

        // 3. Boundary Detection (Left/Right)
        if (posX + adWidth >= windowWidth || posX <= 0) {
            speedX *= -1; // Reverse horizontal direction
            // Keep the ad within bounds if it slightly overshoots
            posX = Math.max(0, Math.min(posX, windowWidth - adWidth));
        }

        // 4. Boundary Detection (Top/Bottom)
        if (posY + adHeight >= windowHeight || posY <= 0) {
            speedY *= -1; // Reverse vertical direction
            // Keep the ad within bounds if it slightly overshoots
            posY = Math.max(0, Math.min(posY, windowHeight - adHeight));
        }

        // 5. Apply new position using CSS 'transform' for better performance
        ad.style.transform = `translate(${posX}px, ${posY}px)`;

        // Request the next frame to keep the animation smooth
        requestAnimationFrame(moveAd);
    }

    // Start the animation loop when the window is loaded
    //requestAnimationFrame(moveAd);

    // Optional: Add a function to close the ad when clicked
    ad.addEventListener('click', () => {
        ad.style.display = 'none';
        window.open('./pages/rainbow.html', '_blank');
    });

    if (localStorage.getItem('cookies-accepted') !== 'true') {

        setTimeout(() => {
            popup.classList.remove('translate-y-full', 'opacity-0');
            popup.classList.add('translate-y-0', 'opacity-100');
        }, 500);
    }


    acceptButton.addEventListener('click', () => {

        // localStorage.setItem('cookies-accepted', 'true');

        // popup.classList.remove('translate-y-0', 'opacity-100');
        // popup.classList.add('translate-y-full', 'opacity-0');

        window.open('./pages/whatareyoucontinuing.html', '_blank');

    });

    accept.addEventListener('click', () => {

        // localStorage.setItem('cookies-accepted', 'true');

        popup.classList.remove('translate-y-0', 'opacity-100');
        popup.classList.add('translate-y-full', 'opacity-0', 'hidden');

        window.open('./pages/thankyouforaccepting.html', '_blank');

        ad.classList.remove('hidden');
        ad.classList.add('block');
        requestAnimationFrame(moveAd);
    });

    declineButton.addEventListener('click', () => {


        // popup.classList.remove('translate-y-0', 'opacity-100');
        // popup.classList.add('translate-y-full', 'opacity-0');

        window.open('./pages/whydidyoudecline.html', '_blank');

    });

    // Warn user when they try to leave the page
    window.onbeforeunload = function () {
        return "";
    };

    answer.addEventListener('click', () => {
        princessImage.classList.remove('hidden');
        princessImage.classList.add('flex');
    });

    window.addEventListener('message', (event) => {
        // ローカルファイル環境では event.origin は 'file://' または 'null' の場合が多い
        if (event.origin === 'file://' || event.origin === 'null') {
            // 信頼できるローカルメッセージの場合のみ処理
            console.log("カスタムイベントを検知しました！");

            princessXl.addEventListener('mouseenter', () => {
                play(farSound);
            });
            princessXl.addEventListener('mouseleave', () => {
                stop(farSound);
            });
            princessLg.addEventListener('mouseenter', () => {
                play(nearSound, 1.4);
            });
            princessLg.addEventListener('mouseleave', () => {
                stop(nearSound, 1.4);
            });
            princessSm.addEventListener('mouseenter', () => {
                play(normalSound, 1.8);
            });
            princessSm.addEventListener('mouseleave', () => {
                stop(normalSound, 1.8);
            });
            princessAns.addEventListener('mouseenter', () => {
                play(veryNearSound, 3);
            });
            princessAns.addEventListener('mouseleave', () => {
                stop(veryNearSound, 3);
            });

        } else {
            console.log("reject", event.detail.message);
            return;
        }
    });

    function play(element, speed = 1) {
        // 現在の再生位置をリセット
        element.currentTime = 0;

        // ループ再生を有効にする
        element.loop = true;

        element.playbackRate = speed;

        // 再生を開始
        const playPromise = element.play();

        // play()はPromiseを返すため、エラー（再生ブロックなど）を捕捉できます
        if (playPromise !== undefined) {
            playPromise.catch(error => {
                console.error("サウンドの再生に失敗しました:", error);
                // 💡 再生に失敗した場合（ミュートやブロック時）、ユーザーにクリックを促すなどの対処が必要
            });
        }
    }

    function stop(element) {
        // 再生を停止
        element.pause();

        // ループを無効に戻す
        element.loop = false;

        // （オプション）再生位置を先頭に戻す
        element.currentTime = 0;
    }
});