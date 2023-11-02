// Зум
try {
    document.addEventListener('DOMContentLoaded', () => {
        document.querySelectorAll('.zoom').forEach(item => {
            if (window.innerWidth >= 1400) {
                item.style.zoom = window.innerWidth / 1400;
            }
            else if (window.innerWidth >= 1280) {
                item.style.zoom = window.innerWidth / 1280;
            } else {
                item.style.zoom = 1;
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
            } else {
                item.style.zoom = 1;
            }
        });
    });
} catch(e) {
    console.error(e);
}

document.addEventListener('DOMContentLoaded', () => {
    try {
        const video = document.querySelector('header .bg video');

        if (window.innerWidth >= 992)
            video.src = video.querySelector('source:first-child').src;
        else if (window.innerWidth >= 576)
            video.src = video.querySelector('source:nth-child(2)').src;
        else 
            video.src = video.querySelector('source:last-child').src;
    } catch(e) {
        console.error(e);
    }

    try {
        const video = document.querySelector('.premium-villas video');

        if (window.innerWidth >= 992)
            video.src = video.querySelector('source:first-child').src;
        else 
            video.src = video.querySelector('source:last-child').src;
    } catch(e) {
        console.error(e);
    }

    // Модальное окно
    try {
        const modals = document.querySelectorAll('.modal');
        modals.forEach(modal => {
            modal.querySelector('.cross').addEventListener('click', (e) => {
                e.preventDefault();
                document.body.classList.remove('modal-open');
                let video = modal.querySelector('video');
                video?.pause();
                modal.classList.remove('open');
                setTimeout(() => {
                    modal.style.opacity = 0;
                    modal.style.zIndex = -10000;
                }, 500);
            });
        });
    } catch(e) {
        console.error(e);
    }
    
    try {
        const buttons = document.querySelectorAll('[href^="#popup:"]');
    
        buttons.forEach(button => {
            let modalName = button.getAttribute('href').split(':')[1];
            button.addEventListener('click', (e) => {
                e.preventDefault();
                document.body.classList.add('modal-open');
                let modal = document.querySelector(`#${modalName}`);
                modal.classList.add('open');
                modal.style.opacity = 1;
                modal.style.zIndex = 7;
                if (modal.classList.contains('video')) {
                    let video = modal.querySelector('video');
                    if (video.hasAttribute('data-src'))
                        video.src = video.getAttribute('data-src');
                    video.removeAttribute('data-src');
                    video.play();
                }
            });
        });
    } catch(e) {
        console.error(e);
    }

    try {
        const sliders = document.querySelectorAll('.slide-modal .slider').forEach(slider => {
            const nextBtn = slider.querySelector('.arrow-right');
            const prevBtn = slider.querySelector('.arrow-left');
            const current = slider.querySelector('.current');
            const total = slider.querySelector('.total');
            const slidesBlock = slider.querySelector('.slides_block');
            const slides = slidesBlock.querySelectorAll('img');
            
            let currentIndex = 0;
            
            current.innerHTML = currentIndex + 1;
            total.innerHTML = slides.length;
            
            nextBtn.addEventListener('click', () => {
                slides[currentIndex].classList.remove('selected');

                if (currentIndex < slides.length - 1)
                    currentIndex++;
                
                slides[currentIndex].classList.add('selected');
                    
                current.innerHTML = currentIndex + 1;
            });
    
            prevBtn.addEventListener('click', () => {
                slides[currentIndex].classList.remove('selected');

                if (currentIndex > 0)
                    currentIndex--;

                slides[currentIndex].classList.add('selected');
                current.innerHTML = currentIndex + 1;
            });
        });

    } catch(e) {
        console.error(e);
    }

    // Инфраструктура
    // Слайдер
    function createSlider(slider) {
        if (slider.hasAttribute('work')) 
            return;

        const nextBtn = slider.querySelector('.arrow-right');
        const prevBtn = slider.querySelector('.arrow-left');
        const current = slider.querySelector('.current');
        const total = slider.querySelector('.total');
        const slidesBlock = slider.querySelector('.slides');
        const slides = slidesBlock.querySelectorAll('.slide');
        
        let currentIndex = 0;
        let slideWidth = parseInt(window.getComputedStyle(slides[0]).width) + parseInt(window.getComputedStyle(slides[0]).marginRight.split('px')[0]) + parseInt(window.getComputedStyle(slides[0]).marginLeft.split('px')[0]) + 1;
        console.log(slideWidth);
        current.innerHTML = currentIndex + 1;
        total.innerHTML = slides.length;
        
        slidesBlock.style.width = slideWidth * slides.length + 'px';

        function switchNextSlide() {
            currentIndex++;

            if (currentIndex > slides.length - 1)
                currentIndex = 0;
        
            slidesBlock.style.transform = `translateX(-${slideWidth * currentIndex}px)`;
            current.innerHTML = currentIndex + 1;
        }

        function switchPrevSlide() {
            currentIndex--;
            if (currentIndex < 0)
                currentIndex = slides.length - 1;
        
            slidesBlock.style.transform = `translateX(-${slideWidth * currentIndex}px)`;
            current.innerHTML = currentIndex + 1;
        }

        nextBtn.addEventListener('click', switchNextSlide);

        prevBtn.addEventListener('click', switchPrevSlide);

        let firstTouch;
        let touchCondition = false;

        function startTouch(e) {
            firstTouch = e.touches[0];
            touchCondition = true;
            slides[currentIndex].style.transitionDuration = "0ms";
        }

        function moveTouch(e) {
            if (touchCondition == false)
                return;

            if (e.touches[0].clientX - firstTouch.clientX < -100) {
                switchNextSlide();
                touchCondition = false;
                return;
            }
            else if (e.touches[0].clientX - firstTouch.clientX > 100) {
                switchPrevSlide();
                touchCondition = false;
                return;
            }

            let transform = e.touches[0].clientX - firstTouch.clientX;
            if (currentIndex == 0 && transform > 0 
                || currentIndex >= slides.length - 1 && transform < 0)
                transform = 0;

            slides[currentIndex].style.transform = `translateX(${transform}px)`;
        }

        function endTouch(e) {
            if (touchCondition) {
                slides[currentIndex].style.transitionDuration = `500ms`;
                touchCondition = false;
                setTimeout(() => {
                    slides.forEach(slide => {
                        slide.style.transform = `translateX(0px)`;
                    });
                }, 500);
            } else {
                slides[currentIndex].style.transform = `translateX(0px)`;
            }

        }

        slider.addEventListener('touchstart', startTouch, event);
        slider.addEventListener('touchmove', moveTouch, event);
        document.addEventListener('touchend', endTouch, event);

        slider.setAttribute('work', true);
    }
    try {
        const section = document.querySelector('.infrastructure');
        createSlider(section.querySelector('.slider'));
    } catch(e) {
        console.error(e);
    }

    // Планировки
    // Меню
    try {
        const menu = document.querySelector('section.plan .menu');
        const typeBtns = menu.querySelectorAll('.head .item');
        const menuBody = menu.querySelectorAll('.body');

        typeBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                typeBtns.forEach(typeBtn => {
                    typeBtn.classList.remove('selected');
                });
                menuBody.forEach(body => {
                    body.classList.remove('open');
                });

                btn.classList.add('selected');
                menu.querySelector(`#${btn.getAttribute('name')}`).classList.add('open');

                if (btn.hasAttribute('name')) {
                    document.querySelector('section.plan .slider.open').classList.remove('open');
                    document.querySelector(`section.plan .slider[name="${btn.getAttribute('name')}"]`).classList.add('open');
                    createSlider(document.querySelector(`section.plan .slider[name="${btn.getAttribute('name')}"]`));
                }
            });
        });

        const menuItems = menu.querySelectorAll('.body .item');

        menuItems.forEach(item => {
            item.addEventListener('click', (e) => {
                if (e.target.classList.contains('name') || e.target.parentElement.classList.contains('name')) {
                    if (item.classList.contains('open') == false) {
                        menuItems.forEach(menuItem => {
                            menuItem.classList.remove('open');
                        });
                        item.classList.add('open');
                    } else {
                        item.classList.remove('open');
                    }
                }
            });
        });
    } catch(e) {
        console.error(e);
    }

    // Слайдер
    try {
        createSlider(document.querySelectorAll('section.plan .slider')[0]);
    } catch(e) {
        console.error(e);
    }

    function onScrolledTo(el, callback) {
        function normOffset() {
          var eR = el.getBoundingClientRect();
          return 1.0 - eR.bottom / (window.innerHeight + el.offsetHeight);
        }
      
        function taskUpdate() {
          if (normOffset() > 0) {
            console.log(el);
            window.removeEventListener('resize', onUpdate);
            window.removeEventListener('scroll', onUpdate);
            callback();
          }
        }
      
        function onUpdate(event) {
          taskUpdate();
        }
      
        window.addEventListener('resize', onUpdate);
        window.addEventListener('scroll', onUpdate);
        taskUpdate();
    }

    // Появление элементов
    try {
        const section = document.querySelector('header');

        onScrolledTo(section, function() {
            setTimeout(() => {
                section.querySelector('.title').classList.add('vis');
            }, 500);
        });
    } catch(e) {
        console.error(e)
    }

    // Премиум виллы
    try {
        const section = document.querySelector('.premium-villas');
        let selector;
        if (window.innerWidth > 992)
            selector = ".info";
        else 
            selector = '.container';

        console.log(selector);
        onScrolledTo(section.querySelector(selector), function() {
            setTimeout(() => {
                section.querySelector('.video').style.opacity = 1;
                section.querySelector('.location').style.opacity = 1;
            }, 100);

            setTimeout(() => {
                section.querySelector('h2').style.opacity = 1;
                section.querySelectorAll('.list p').forEach((item, index) => {
                    setTimeout(() => {
                        item.style.opacity = 1;
                    }, (400 * (index + 1)));
                });
            }, 600);

            setTimeout(() => {
                section.querySelector('.billet .bg').style.transform = "scaleY(1)";
                setTimeout(() => {
                    section.querySelector('.billet figure').style.opacity = "1";
                    section.querySelector('.billet img').style.opacity = "1";
                }, 1000)
            }, 2500);
        });
    } catch(e) {
        console.error(e)
    }

    // Информационный блок
    try {
        const section = document.querySelector('.premium-villas .info');

        onScrolledTo(document.querySelector('.achievements'), function() {
            setTimeout(() => {
                section.querySelector('img').style.opacity = 1;
            }, 100);

            setTimeout(() => {
                section.querySelector('.offer').style.opacity = 1;
            }, 600);

            setTimeout(() => {
                section.querySelector('.price').style.opacity = 1;
            }, 1000);

            const achievements = document.querySelector('.achievements');

            setTimeout(() => {
                achievements.querySelectorAll('.circle').forEach((circle, index) => {
                    setTimeout(() => {
                        circle.style.opacity = 1;
                    }, 300 * index)
                });
            }, 1200);

            setTimeout(() => {
                achievements.querySelector('h2').style.opacity = 1;
            }, 1800);

            setTimeout(() => {
                achievements.querySelector('.button').style.opacity = 1;
            }, 2400);
        });
    } catch(e) {
        console.error(e)
    }

    // Планировка
    try {
        const section = document.querySelector('.plan');

        if (window.innerWidth > 992)
            selector = ".link";
        else 
            selector = '.head';

        onScrolledTo(section.querySelector(selector), function() {
            setTimeout(() => {
                section.style.opacity = 1;
            }, 200);
        });
    } catch(e) {
        console.error(e)
    }

    // Сладер
    try {
        const section = document.querySelector('.infrastructure');

        onScrolledTo(section.querySelector('.offer'), function() {
            setTimeout(() => {
                section.style.opacity = 1;
            }, 200);
        });
    } catch(e) {
        console.error(e)
    }

    // Даты
    try {
        const section = document.querySelector('.dates');

        onScrolledTo(section.querySelector('.item'), function() {
            setTimeout(() => {
                section.style.opacity = 1;
            }, 200);
        });
    } catch(e) {
        console.error(e)
    }
});


