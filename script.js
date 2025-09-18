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
    const container = document.getElementById('animation-container');

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

    princessAns.addEventListener('click', () => {
        const elements = container.querySelectorAll('.fallen-element');
        const congratulations = document.getElementById('congratulations');

        elements.forEach((element, index) => {
            // ----------------------------------------------------
            // 1. 各要素を absolute にして、現在の位置を固定
            // ----------------------------------------------------
            const rect = element.getBoundingClientRect();

            // 💡 画面下端までの移動量を計算
            // window.innerHeight = 画面の最下部のY座標
            // rect.top = 要素の上辺のY座標
            // 移動量 = 画面下部 - 要素の現在位置 + 要素自身の高さ（画面下端に合わせるため）
            const deltaY = window.innerHeight - rect.top;

            // Tailwindの任意の値 ([...]) を使ってインラインCSSを設定
            element.classList.add(
                'absolute',
                'z-[1000]', // 手前に出す
                'transition-all', // 全てのプロパティにトランジションを適用
                'ease-in',     // 加速しながら落ちる
                `duration-[1500ms]`,
                `top-[${rect.top}px]`,
                `left-[${rect.left}px]`
            );

            // 元の位置指定クラスは削除し、マージンもリセット
            element.classList.remove('relative', 'flex', 'm-4', 'gap-4', 'w-full', 'h-full');
            element.style.margin = '0';

            // ----------------------------------------------------
            // 2. アニメーションを開始
            // ----------------------------------------------------
            const delay = index * 100; // 0.1s ずつ遅延
            element.style.transitionDelay = `${delay}ms`;

            // 画面下端までの移動と回転を適用
            element.classList.add(
                `translate-y-[${deltaY}px]`, // 計算された移動量
                'rotate-[360deg]' // 落下中に一回転
            );

            // ----------------------------------------------------
            // 3. アニメーション完了後に静止させる
            // ----------------------------------------------------
            setTimeout(() => {
                // 1. トランジションを一旦解除
                element.style.transition = 'none';

                // 2. absolute を解除し、fixed で下部に固定
                element.classList.remove(
                    'absolute',
                    `top-[${rect.top}px]`,
                    `left-[${rect.left}px]`,
                    `translate-y-[${deltaY}px]`, // transform解除
                    'rotate-[360deg]'
                );

                // 3. 画面下部に集めるための固定クラスを追加
                // 画面中央に集め、bottom: 0 で固定
                element.classList.add('fixed', 'bottom-0', 'left-1/2', '-translate-x-1/2', 'z-[20]');

                // (オプション) 固定後にわずかに上へアニメーションさせる
                // すぐに transform をリセットすることで、要素が画面下端に移動し、
                // その後 translate-y-[-1rem] が効いて下からフワッと浮かび上がります
                setTimeout(() => {
                    element.style.transition = 'transform 0.3s ease-out';
                    element.classList.add('translate-y-[-1rem]'); // 画面下から少し浮かせる
                }, 50);

                congratulations.classList.remove('hidden');
                congratulations.classList.add('absolute', 'top-0', 'left-[30rem]', 'z-50');
            }, 1500 + delay);
        });

        // 全要素の処理完了後にボタンを有効化 (最長のアニメーション時間を基準)
        setTimeout(() => {
            destroyBtn.disabled = false;
            destroyBtn.textContent = '落下アニメーションを再開';
            destroyBtn.classList.remove('opacity-50', 'cursor-not-allowed');
        }, 1500 + boxes.length * 100);
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