const gameContainer = document.getElementById('game-container');
const banana = document.getElementById('banana');
const slipSound = new Audio('sounds/slip.mp3');

let officers = [];
const OFFICER_SPEED = 3;
const SLIP_SPEED = 10;
const SPAWN_RATE = 2000; // Average ms

function spawnOfficer() {
    const officer = document.createElement('img');
    officer.src = 'images/ice-1.png';
    officer.classList.add('officer');

    // Start off-screen left
    officer.style.left = '-150px';

    // Position vertically so they walk through the center area
    // Banana is at 50% top. Let's center the officer roughly there too.
    // Randomize slightly so they aren't all in a single line? 
    // User said "center of the scene" for banana. I'll keep officers vertically centered to ensure collision.
    // Adjusting for officer height (approx 100-150px?)
    officer.style.top = 'calc(50% - 75px)';

    gameContainer.appendChild(officer);

    officers.push({
        element: officer,
        x: -150,
        y: gameContainer.clientHeight / 2 - 75, // Initial Y (approx)
        slipping: false,
        falling: false,
        stage: 1 // 1=walking, 2=slip start, 3=slip complete
    });
}

function update() {
    // Remove officers that are gone
    for (let i = officers.length - 1; i >= 0; i--) {
        const off = officers[i];

        if (off.falling) {
            // Move down
            off.y += SLIP_SPEED;
            off.element.style.top = off.y + 'px';

            // Check if off screen bottom
            if (off.y > window.innerHeight) {
                off.element.remove();
                officers.splice(i, 1);
            }
        } else if (!off.slipping) {
            // Move right only if not slipping (and not yet falling)
            off.x += OFFICER_SPEED;
            off.element.style.left = off.x + 'px';

            // Check if off screen right
            if (off.x > window.innerWidth) {
                off.element.remove();
                officers.splice(i, 1);
            }
        }
    }

    requestAnimationFrame(update);
}

// Spawner loop
function scheduleSpawn() {
    const delay = Math.random() * 2000 + 1000; // 1 to 3 seconds
    setTimeout(() => {
        spawnOfficer();
        scheduleSpawn();
    }, delay);
}

// Start game loop
scheduleSpawn();
requestAnimationFrame(update);


// Interaction
document.addEventListener('keydown', (e) => {
    if (e.code === 'Space') {
        placeBanana();
    }
});

function placeBanana() {
    // Show banana
    banana.style.display = 'block';

    // Play sound (clone to allow overlapping sounds)
    slipSound.cloneNode(true).play().catch(e => console.log("Audio play error:", e));

    // Check collisions
    const bananaRect = banana.getBoundingClientRect();

    officers.forEach(off => {
        if (off.slipping) return; // Already slipping

        const offRect = off.element.getBoundingClientRect();

        // Simple AABB collision
        if (
            offRect.left < bananaRect.right &&
            offRect.right > bananaRect.left &&
            offRect.top < bananaRect.bottom &&
            offRect.bottom > bananaRect.top
        ) {
            triggerSlip(off);
        }
    });

    // Hide banana after 100ms
    setTimeout(() => {
        banana.style.display = 'none';
    }, 100);
}

function triggerSlip(officerObj) {
    officerObj.slipping = true; // Stops horizontal movement immediately

    // "put a 200 millisecond delay between ice-1.png and ice-2.png"
    setTimeout(() => {
        if (!officerObj.element.parentNode) return;

        officerObj.element.src = 'images/ice-2.png';
        officerObj.stage = 2;

        // Start moving down now? Or Wait for ice-3? 
        // Let's assume the slip animation plays out then they fall, 
        // or they fall while slipping. Falling during the slip images makes sense.
        officerObj.falling = true;

        // Transition to ice-3 after another short delay to make the animation visible
        setTimeout(() => {
            if (officerObj.element.parentNode) {
                officerObj.element.src = 'images/ice-3.png';
                officerObj.stage = 3;
            }
        }, 200);

    }, 200);
}
