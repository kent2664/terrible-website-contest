document.addEventListener('DOMContentLoaded', () => {
    const popup = document.getElementById('cookie-popup');
    const acceptButton = document.getElementById('continue');
    const declineButton = document.getElementById('decline-cookies');
    const accept = document.getElementById('accept');
    const ad = document.getElementById('bouncing-ad');

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

        window.open('./pages/whereareyougoing.html', '_blank');

    });

    accept.addEventListener('click', () => {

        // localStorage.setItem('cookies-accepted', 'true');

        popup.classList.remove('translate-y-0', 'opacity-100');
        popup.classList.add('translate-y-full', 'opacity-0');

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

    // ユーザーがページを離れようとしたときに実行
    window.onbeforeunload = function () {
        // ここに表示したいメッセージを入力する（ブラウザによって表示されない場合がある）
        return "It's not over yet!";
    };
});