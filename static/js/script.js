// try {
//     document.addEventListener('wheel', (e) => {
//         var nt = $(document.body).scrollTop()-(e.deltaY*e.deltaFactor*100);
//         e.preventDefault(); 
//         e.stopPropagation(); 
//     });
// } catch(e) {
//     console.error(e);
// }

// Зум
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

document.addEventListener('DOMContentLoaded', () => {
    
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
        let slideWidth = parseInt(window.getComputedStyle(slides[0]).width) + parseInt(window.getComputedStyle(slides[0]).marginRight.split('px')[0]) + parseInt(window.getComputedStyle(slides[0]).marginLeft.split('px')[0]);
        console.log(slideWidth);
        current.innerHTML = currentIndex + 1;
        total.innerHTML = slides.length;
        
        slidesBlock.style.width = slideWidth * slides.length + 'px';

        nextBtn.addEventListener('click', () => {
            if (currentIndex < slides.length - 1)
                currentIndex++;
            
            slidesBlock.style.transform = `translateX(-${slideWidth * currentIndex}px)`;
            current.innerHTML = currentIndex + 1;
        });

        prevBtn.addEventListener('click', () => {
            if (currentIndex > 0)
                currentIndex--;
            
            slidesBlock.style.transform = `translateX(-${slideWidth * currentIndex}px)`;
            current.innerHTML = currentIndex + 1;
        });

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
                menu.querySelector(`#${btn.getAttribute('name')}`).classList.add('open')
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

            item.querySelectorAll('div').forEach(btn => {
                btn.addEventListener('click', () => {
                    if (btn.hasAttribute('name')) {
                        document.querySelector('section.plan .slider.open').classList.remove('open');
                        document.querySelector(`section.plan .slider[name="${btn.getAttribute('name')}"]`).classList.add('open');
                        createSlider(document.querySelector(`section.plan .slider[name="${btn.getAttribute('name')}"]`));
                    }
                });
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
    // Премиум виллы
    try {
        const section = document.querySelector('.premium-villas');

        onScrolledTo(section.querySelector('.info'), function() {
            setTimeout(() => {
                section.querySelector('.video').style.opacity = 1;
                section.querySelector('.location').style.opacity = 1;
            }, 200);

            setTimeout(() => {
                section.querySelector('h2').style.opacity = 1;
                section.querySelectorAll('.list p').forEach((item, index) => {
                    setTimeout(() => {
                        item.style.opacity = 1;
                    }, (500 * (index + 1)));
                });
            }, 1000);

            setTimeout(() => {
                section.querySelector('.billet').style.opacity = 1;
            }, 3000);
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
            }, 300);

            setTimeout(() => {
                section.querySelector('.offer').style.opacity = 1;
            }, 1000);

            setTimeout(() => {
                section.querySelector('.price').style.opacity = 1;
            }, 1700);
        });
    } catch(e) {
        console.error(e)
    }

    // Достижения
    try {
        const section = document.querySelector('.achievements');

        onScrolledTo(document.querySelector('.achievements .ticket'), function() {
            setTimeout(() => {
                section.querySelectorAll('.circle').forEach((circle, index) => {
                    setTimeout(() => {
                        circle.style.opacity = 1;
                    }, 500 * index)
                });
            }, 100);

            setTimeout(() => {
                section.querySelector('h2').style.opacity = 1;
            }, 2000);

            setTimeout(() => {
                section.querySelector('.button').style.opacity = 1;
            }, 2700);
        });
    } catch(e) {
        console.error(e)
    }

    // Сладер
    try {
        const section = document.querySelector('.infrastructure');

        onScrolledTo(section.querySelector('.arrow'), function() {
            setTimeout(() => {
                section.style.opacity = 1;
            }, 500);
        });
    } catch(e) {
        console.error(e)
    }

    // Даты
    try {
        const section = document.querySelector('.dates');

        onScrolledTo(document.querySelector('footer'), function() {
            setTimeout(() => {
                section.style.opacity = 1;
            }, 500);
        });
    } catch(e) {
        console.error(e)
    }
});


