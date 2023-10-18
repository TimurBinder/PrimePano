// Первый экран
try {
    document.addEventListener('DOMContentLoaded', () => {
        document.querySelectorAll('.zoom').forEach(item => {
            if (window.innerWidth >= 1400) {
                item.style.zoom = window.innerWidth / 1400;
            }
            else if (window.innerWidth >= 1280) {
                item.style.zoom = window.innerWidth / 1280;
            }
        });
    });
    window.addEventListener('resize', () => {
        document.querySelectorAll('.zoom').forEach(item => {
            if (window.innerWidth >= 1400) {
                item.style.zoom = window.innerWidth / 1400;
            }
            else if (window.innerWidth >= 1280) {
                item.style.zoom = window.innerWidth / 1280;
            }
        });
    });
} catch(e) {
    console.error(e);
}