$(function() {

  // オープニングアニメーション
  $(function () {
    var webStorage = function () {
      if (sessionStorage.getItem('access')) {
        /*2回目以降アクセス時の処理*/
        $(".title_logo").show();
        $(".bg_top").remove();
        $(".bg_under").remove();
      } else {
        /*初回アクセス時の処理*/
        sessionStorage.setItem('access', 'true'); // sessionStorageにデータを保存
        setTimeout(function () {
            $('.title_logo').fadeIn(1000);
        }, 300); 
        
        setTimeout(function () {
            $('.bg_top').fadeIn(500);
        }, 2500); 

        //.titleの幅と高さを取得
        var topElem = document.querySelector('.title');
        var topWidth  = topElem.offsetWidth,
            topHeight = topElem.offsetHeight;
        $('.bg_top').width(topWidth);
        $('.bg_top').height(topHeight);
        
        //.title_bgの幅と高さを取得
        var underElem = document.querySelector('.title_bg');
        var underWidth  = underElem.offsetWidth,
            underHeight = underElem.offsetHeight;
        $('.bg_under').width(underWidth);
        $('.bg_under').height(underHeight);


        setTimeout(function () {
            $('.bg_under').fadeOut(0);
        }, 3000);

        setTimeout(function () {
            $('.bg_top').fadeOut(1000);
        }, 3000); 
      }
    }
    webStorage();
  });


  //ハンバーガー
  $(".openbtn1").click(function () {
    $(this).toggleClass('active');
      $(".gnav").toggleClass('panelactive');
  });
  
  $(".gnav a").click(function () {
      $(".openbtn1").removeClass('active');
      $(".gnav").removeClass('panelactive');
  });


  //フワッと出現
  function fadeAnime(){
    $('.fadeUpTrigger').each(function(){
    var elemPos = $(this).offset().top+80;
    var scroll = $(window).scrollTop();
    var windowHeight = $(window).height();
      if (scroll >= elemPos - windowHeight){
        $(this).addClass('fadeUp');
      }else{
        $(this).removeClass('fadeUp');
      }
    });
  }
    
  $(window).scroll(function (){
    fadeAnime();
  });


  //サブナビゲーションの出現
  var gnav = $('.gnav');

  $(window).on('load scroll', function(){
    if($(this).scrollTop() > 600) {
      gnav.addClass('active');
    }else{
      gnav.removeClass('active');
    }
  });
  
  //ヘッダーの出現（モバイル）
  var header = $('header');

  $(window).on('load scroll', function(){
    if($(this).scrollTop() > 600) {
      header.addClass('header_active');
    }else{
      header.removeClass('header_active');
    }
  });
  
  //円グラフ
  let targets = document.querySelectorAll('.ps'); 
  let il = document.querySelector('.il');
  let xd = document.querySelector('.xd');
  let html = document.querySelector('.html');
  let js = document.querySelector('.js');
  let wp = document.querySelector('.wp');
  window.addEventListener('scroll', function () {
    var scroll = window.scrollY; //スクロール量を取得
    var windowHeight = window.innerHeight; //画面の高さを取得
    for (let target of targets) { //ターゲット要素がある分、アニメーション用のクラスをつける処理を繰り返す
      var targetPos = target.getBoundingClientRect().top + scroll; //ターゲット要素の位置を取得
      if (scroll > targetPos - windowHeight) { //スクロール量 > ターゲット要素の位置
        target.classList.add('ps_active'); 
        il.classList.add('il_active');
        xd.classList.add('xd_active');
        html.classList.add('html_active');
        js.classList.add('js_active');
        wp.classList.add('wp_active');
      }
    }
  });

    //aboutに到達したらテキストを流す
  $(window).scroll(function(){
    var scrollTop = $(window).scrollTop();
    $(".label").not(".scroll_active").each(function(){
        var top = $(this).offset().top-180;
        var height = $(window).height();
        if (scrollTop > top - height){
          $(this).addClass("scroll_active");
        }
    });
  });
  

  //サブナビゲーションの現在位置表示
    $(function() {
    var navLink = $('.gnav li a');
  
      // 各コンテンツのページ上部からの開始位置と終了位置を配列に格納
    var contentsArr = new Array();//new Array()はからの配列が作れる。[]と書いても一緒。
    for (var i = 0; i < navLink.length; i++) {
        var targetContents = navLink.eq(i).attr('href');//eq()はインデックス番号で要素取得できる
        if(targetContents.charAt(0) == '#') {//charAt(x)はx番目の文字を取得できる
              var targetContentsTop = $(targetContents).offset().top - 300;
              var targetContentsBottom = targetContentsTop + $(targetContents).outerHeight(true) - 1;//margin含めた高さ。引数無しならmargin含まない。-1は謎…。
              contentsArr[i] = [targetContentsTop, targetContentsBottom]
        }
    };
  
      // 現在地をチェック
    function currentCheck() {
          var windowScrolltop = $(window).scrollTop();
          for (var i = 0; i < contentsArr.length; i++) {
            if(contentsArr[i][0] <= windowScrolltop && contentsArr[i][1] >= windowScrolltop) {
                navLink.removeClass('current');
                navLink.eq(i).addClass('current');
                  i == contentsArr.length;
              }
        };
    }
  
    $(window).on('load scroll', function() {
        currentCheck();
    });
  });

  //スムーススクロール
  $("nav a").click(function(){
    var target = $($(this).attr("href")).offset().top;
    $("html, body").animate({scrollTop: target-60}, 500);
  });
  
  //ページトップスクロール
  $("#page_top a").click(function(){
    $("html, body").animate({scrollTop: 0}, 500);
    return false;
  });

});