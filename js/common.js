document.addEventListener('DOMContentLoaded', function () {
  // GNB 메뉴 컨트롤
  const gnbItems = document.querySelectorAll('.gnb .left_menu > ul > li');
  const gnbArea = document.querySelector('.gnb_area');

  gnbItems.forEach(function (item) {
    item.addEventListener('mouseenter', function () {
      gnbArea.style.height = '500px';
    });
  });

  gnbArea.addEventListener('mouseleave', function () {
    gnbArea.style.height = '80px';
  });

  // 탑 배너 닫기 컨트롤
const bannerCloseBtn = document.getElementById('bannerCloseBtn');
const headerEl = document.getElementById('header');

bannerCloseBtn.addEventListener('click', function () {
  // header에 banner-closed 클래스 추가 -> CSS 변수에 의해 높이가 자동으로 줄어듦
  headerEl.classList.add('banner-closed');
});

// 서치 아이콘 클릭시 
  const searchBtn = document.querySelector('.search_btn');
  const searchCloseBtn = document.querySelector('.big_close_btn');
  const searchArea = document.querySelector('.search_area');

  searchBtn.addEventListener('click', function() {
    searchArea.classList.add('on');
  });

  searchCloseBtn.addEventListener('click', function() {
    searchArea.classList.remove('on');
  });
  

  // 모바일 메뉴
  const menuBtn = document.querySelector('.m_menu_btn');
  const closeBtn = document.querySelector('.m_close_btn');
  const m_gnbArea = document.querySelector('.m_gnb_area');

  // 햄버거 버튼을 누르면 메뉴 열림
  menuBtn.addEventListener('click', () => {
    m_gnbArea.classList.add('on');
  });

  // 닫기(X) 버튼을 누르면 메뉴 닫힘
  closeBtn.addEventListener('click', () => {
    m_gnbArea.classList.remove('on');
  });

  const mGnbLinks = document.querySelectorAll('.m_gnb > ul > li > a');
  mGnbLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      const parentLi = link.parentElement;
      const subMenu = parentLi.querySelector('.m_sub_menu');

      if (subMenu) {
        e.preventDefault();
        mGnbLinks.forEach(otherLink => {
          if(otherLink !== link) {
            otherLink.parentElement.classList.remove('on');
          }
        });

        parentLi.classList.toggle('on');
      }
    });
  });

  //section01 메인슬라이드 영역
  var mainSwiper = new Swiper('.mySwiper.slide01', {
    pagination: {
      el: '.swiper-pagination',
      type: 'fraction',
    },
    loop: true,
    autoplay: {
      delay: 3000,
      disableOnInteraction: false,
    },
    effect: 'fade',
    fadeEffect: { crossFade: true },
    navigation: {
      nextEl: '.main_slide_next',
      prevEl: '.main_slide_prev',
    },
  });

  //section04 제품 영역 탭메뉴 & 슬라이드
  const prdSwipers = [];
  const slideElements = document.querySelectorAll('.prd_slide');
  const tabItems = document.querySelectorAll('.art04 .tab_menu > ul > li');

  slideElements.forEach((element, index) => {
    prdSwipers[index] = new Swiper(element, {
      slidesPerView: 4,
      spaceBetween: 20,
      loop: true,
      observer: true,
      observeParents: true,
      pagination: {
        el: element.querySelector('.swiper-pagination'),
        clickable: true,
      },
      breakpoints: {
        // 가로 해상도 320px 이상일 때 (모바일)
        320: {
          slidesPerView: 2,
          spaceBetween: 10,
        },
        // 가로 해상도 768px 이상일 때 (태블릿)
        768: {
          slidesPerView: 3,
          spaceBetween: 15,
        },
        // 가로 해상도 1024px 이상일 때 (PC)
        1024: {
          slidesPerView: 4,
          spaceBetween: 20,
        },
      },
    });
  });

  function initFirstTab() {
    if (prdSwipers[0]) {
      prdSwipers[0].params.navigation.nextEl = '.prd_btn_wrap .right';
      prdSwipers[0].params.navigation.prevEl = '.prd_btn_wrap .left';
      prdSwipers[0].navigation.init();
      prdSwipers[0].navigation.update();
    }
  }
  initFirstTab();

  tabItems.forEach((tab, indexNum) => {
    tab.addEventListener('click', function (e) {
      e.preventDefault();

      const idx = indexNum + 1;
      tabItems.forEach((li) => li.classList.remove('on'));
      this.classList.add('on');

      document.querySelectorAll('.art04 .tab_menu > ul > li > a').forEach((a) => {
        a.classList.remove('active');
      });
      const currentAnchor = this.querySelector('a');
      if (currentAnchor) currentAnchor.classList.add('active');

      slideElements.forEach((slide) => slide.classList.remove('on'));
      const targetSlide = document.getElementById(`prd_slide0${idx}`);
      if (targetSlide) targetSlide.classList.add('on');

      const currentSwiper = prdSwipers[indexNum];
      if (currentSwiper) {
        setTimeout(function () {
          currentSwiper.params.navigation.nextEl = '.prd_btn_wrap .right';
          currentSwiper.params.navigation.prevEl = '.prd_btn_wrap .left';
          currentSwiper.navigation.init();
          currentSwiper.navigation.update();

          currentSwiper.update();
          currentSwiper.slideToLoop(0, 0, false);
        }, 50);
      }
    });
  });

  // Section05 신제품 슬라이드
  var swiperNew = new Swiper('.mySwiper.new_item_slide', {
    centeredSlides: true,
    autoplay: {
      delay: 3000,
      disableOnInteraction: false,
    },
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    },
    effect: 'fade',
    fadeEffect: { crossFade: true },
  });

  // 패밀리 사이트 토글
  const familyBoxes = document.querySelectorAll('.family_select_box');

  familyBoxes.forEach(familyBox => {
    const familyBtn = familyBox.querySelector('.family_btn');

    if (familyBtn) {
      familyBtn.addEventListener('click', function(e) {
        e.stopPropagation();
        
        // 클릭한 본인 외에 다른 열려있는 목록은 닫기
        familyBoxes.forEach(otherBox => {
          if (otherBox !== familyBox) {
            otherBox.classList.remove('on');
          }
        });

        familyBox.classList.toggle('on');
      });
    }
  });

  // 문서 전체를 클릭했을 때 열려있는 목록 닫기
  document.addEventListener('click', function() {
    familyBoxes.forEach(familyBox => {
      familyBox.classList.remove('on');
    });
  });
});