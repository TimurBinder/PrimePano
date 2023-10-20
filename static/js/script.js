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

    // Инфраструктура
    // Слайдер
    try {
        const section = document.querySelector('.infrastructure');
        const nextBtn = section.querySelector('.arrow-right');
        const prevBtn = section.querySelector('.arrow-left');
        const current = section.querySelector('.current');
        const total = section.querySelector('.total');
        const slidesBlock = section.querySelector('.slides');
        const slides = slidesBlock.querySelectorAll('.slide');
        
        let currentIndex = 0;
        let slideWidth = parseInt(slides[0].getBoundingClientRect().width) + parseInt(window.getComputedStyle(slides[0]).marginRight.split('px')[0]) + parseInt(window.getComputedStyle(slides[0]).marginLeft.split('px')[0]);
        console.log(slideWidth);
        current.innerHTML = currentIndex + 1;
        total.innerHTML = slides.length;
        
        slidesBlock.style.width = slideWidth * (slides.length) + 'px';

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
    } catch(e) {
        console.error(e);
    }


    function onScrolledTo(el, callback) {

        // Определяем нормализованное смещение элемента в видимой области окна (от 0 до 1)
        // 0 = элемент выехал снизу из под экрана ... 1 = элемент заехал вверх под экран
        function normOffset() {
          var eR = el.getBoundingClientRect();
          return 1.0 - eR.bottom / (window.innerHeight + el.offsetHeight);
        }
      
        // Выполнение задачи
        function taskUpdate() {
          if (normOffset() > 0) {
            window.removeEventListener('resize', onUpdate);
            window.removeEventListener('scroll', onUpdate);
            callback();
          }
        }
      
        // Слушатель
        function onUpdate(event) {
          taskUpdate();
        }
      
        // Запуск задачи
        window.addEventListener('resize', onUpdate);
        window.addEventListener('scroll', onUpdate);
        taskUpdate();
      
      }

    // Премиум виллы
    try {
        const section = document.querySelector('.premium-villas');

        onScrolledTo(section.querySelector('.info'), function() {
            setTimeout(() => {
                section.querySelector('.video').style.opacity = 1;
                section.querySelector('.location').style.opacity = 1;
            }, 700);

            setTimeout(() => {
                section.querySelector('h2').style.opacity = 1;
                section.querySelectorAll('.list p').forEach((item, index) => {
                    setTimeout(() => {
                        item.style.opacity = 1;
                    }, (500 * (index + 2)));
                });
            }, 1000);

            setTimeout(() => {
                section.querySelector('.billet').style.opacity = 1;
            }, 4000);
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
            }, 700);

            setTimeout(() => {
                section.querySelector('.offer').style.opacity = 1;
            }, 1500);

            setTimeout(() => {
                section.querySelector('.price').style.opacity = 1;
            }, 2100);
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
            }, 500);

            setTimeout(() => {
                section.querySelector('h2').style.opacity = 1;
            }, 2800);

            setTimeout(() => {
                section.querySelector('.button').style.opacity = 1;
            }, 3300);
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


