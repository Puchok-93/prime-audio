function initMultipleSlider() {
    const multipleSlider = document.getElementById('multiple-slider');

    if(!multipleSlider) {
        return
    }

    const multipleSliderWrapper = multipleSlider.querySelector('.swiper-wrapper');
    const banners = document.querySelectorAll('.banner');
    const sControlsTemplate = `
		<div class="swiper-pagination-controls">
			<div class="swiper-button-prev">
				<svg width="20" height="20" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
					<rect x="0.5" y="15.5" width="15" height="15" rx="7.5" transform="rotate(-90 0.5 15.5)"/>
					<path d="M9 11L6 8L9 5" stroke-linecap="round" stroke-linejoin="round"/>
				</svg>
			</div>
			<div class="swiper-pagination"></div>
			<div class="swiper-button-next">
				<svg width="20" height="20" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
					<rect x="0.5" y="15.5" width="15" height="15" rx="7.5" transform="rotate(-90 0.5 15.5)"/>
					<path d="M7 5L10 8L7 11" stroke-linecap="round" stroke-linejoin="round"/>
				</svg>
			</div>
		</div>
	`

    if(banners.length > 3 || window.innerWidth < 767 && banners.length > 1) {
        multipleSliderWrapper.classList.remove('catalog-banner-list');
        multipleSlider.insertAdjacentHTML('beforeend', sControlsTemplate);

        const slider = new Swiper(multipleSlider, {
            simulateTouch: true,
            spaceBetween: 15,
            pagination: {
                el: '.swiper-pagination',
                clickable: true,
            },
            navigation: {
                nextEl: ".swiper-button-next",
                prevEl: ".swiper-button-prev",
            },
            breakpoints: {
                1024: {
                    slidesPerView: 3,
                },
                768: {
                    slidesPerView: 2,
                }
            }
        })
    }
    console.log('test')
}

function initBrands() {
    const obBrandList = document.querySelector('.brand-list');
    const sBrandTemplate = ({name, link, backgroundImg, logoImg}) =>
        `
            <li class="brand" style="background: url(img/backgrounds/${backgroundImg}) center / cover">
                <a class="brand__link" href="https://drhead.ae/brands/${link}/">
                    <img class="brand-info__img" src="img/logos/${logoImg}" alt="${name}">
                </a>
                <a class="brand__sub-link" href="https://drhead.ae/brands/${link}">View more</a>
            </li>
        `
    ;

    const render = () => {
        obBrandList.innerHTML = '';
        const createBrandsString = brands.map(item => sBrandTemplate(item)).join('');
        obBrandList.insertAdjacentHTML('beforeend', createBrandsString);
    }

    render();
}

function initMobNavigation() {
    const navigation = document.querySelector('.header-content');
    const navigationBtn = document.querySelector('#burger-mob-navigation');

    navigationBtn.addEventListener('click', (e) => {
        const target = e.target;

        if(target) {
            navigation.classList.toggle('js-active');
            navigationBtn.classList.toggle('js-active');
        }
    })
}

function initSmoothScroll() {
    const anchors = document.querySelectorAll('.anchor');

    for (let anchor of anchors) {
        anchor.addEventListener('click', function (e) {
            e.preventDefault()
            const blockID = anchor.getAttribute('href').substr(1);
            let offset = 100;
            window.scrollTo({
                behavior: 'smooth',
                top:
                    document.getElementById(blockID).getBoundingClientRect().top -
                    document.body.getBoundingClientRect().top - offset,
            })

            if(window.innerWidth < 768) {
                document.querySelector('.navigation').classList.remove('js-active');;
                document.querySelector('#burger-mob-navigation').classList.remove('js-active');;
            }
        })
    }
}

function init() {
    initMultipleSlider();
    initBrands();
    initSmoothScroll();
    if(window.innerWidth < 1025) {
        initMobNavigation();
    }

    console.log(brands)
}

window.addEventListener('DOMContentLoaded', init);