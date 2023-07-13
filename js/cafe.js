$(function(){
    // 검색
    $('.search-select').click(function(e){
        e.preventDefault();
        // search-box 값을 받아다가 변수 dp에 저장한다.
        const dp = $('.search-sbox').css("display"); 
        // dp 값이 none일 때와 block일때를 구분한다.
        if (dp == "none"){
            // none 이라면 아래 화살표를 지우고 위에 화살표를 넣는다.
            $('.selectbox').find('.fa-solid')
                .removeClass('fa-angle-down')
                .addClass('fa-angle-up');
            //  search-sbox를 display block으로 바꾼다.
            $('.search-sbox').show();
        }else{
            // none과 반대의 처리를 한다.
            $('.selectbox').find('.fa-solid').removeClass('fa-angle-up').addClass('fa-angle-down');
            $('.search-sbox').hide();
        };
    });
    console.log(``)

    $('.search-sbox>a').click(function(e){
        e.preventDefault();
        // 클릭한 것의 내용을 txt에 저장
        const txt = $(this).text(); 
        // search-select에 txt를 입력
        $('.search-select').text(txt); 
        // search-sbox를 숨김
        $('.search-sbox').hide(); 
        // selectbox에서 fa-solid를 찾아 fa-angle-up을 지우고 fa-angle-down을 넣는다.
        $('.selectbox').find('.fa-solid').removeClass('fa-angle-up').addClass('fa-angle-down'); 
        // id가 selectbox인 태그에 txt 내용을 value속성에 입력
        $('#selectbox').val(txt);
        // ** focus() 메서드는 포커스 이벤트를 트리거하거나 포커스 이벤트가 발생할 때 실행할 함수를 첨부합니다.
        // id가 searchtext인 태그 focus
        $('#searchtext').focus();

    });

    $('.hero li').mouseenter(function(){
        //  mouseenter 마우스가 벗어났을때
        $('.hero li').removeClass('active');
        $(this).addClass('active');
    });

     // slide show 
    let slide = setInterval(mySlide, 10000);

    $('.next').click(function(){
        clearInterval(slide);
        mySlide();
        slide = setInterval(mySlide, 10000);
    });

    $('.prev').click(function(){
        clearInterval(slide);
        prevEvent();
        slide = setInterval(mySlide, 10000);
    });

    myTime();
    

    // 데이터 가져오기
    jQuery.ajax({
        type: "GET",
        url: "./data/data.json",
        dataType: "JSON",
        success: function(data){
            let list = '';
            for(let i = 0; i < data.cafelist.length; i++){
                list += '<li><a href="#" class="d-flex align-items-center justify-content-between">';
                list += '<div class="tbox d-flex align-items-center">';
                list += '<img src="' + data.cafelist[i].img + '" alt="' + data.cafelist[i].num + '">';
                list += '<h1>' + data.cafelist[i].num + '</h1><p class="ellipsis">' + data.cafelist[i].content + '</p></div>';
                list += '<div class="cfe d-flex"><p class="ellipsis">' + data.cafelist[i].cafename +'</p>';
                list += '<p class="dg">' + data.cafelist[i].comment + '</p></div>'
                list += '</a></li>'
            };
            $('.clist').html(list);
        }
    });
    jQuery.ajax({
        type: "GET",
        url: "./data/notice.json",
        dataType: "JSON",
        success: function(data){
            let list = '';
            for(let i = 0; i < data.noticelist.length; i++){
                list += '<li class="ellipsis"><a href="#">' + data.noticelist[i].content + '</a></li>';
            };
            $('.notice-list').html(list);
        }
    });

    $('.smallbanner>a').click(function(e){
        e.preventDefault();
        const eq0 = $()
    });


    $(window).on('scroll', function(){
        if($(window).scrollTop() > 2000){
            $(".angletop").fadeIn();
        }else{
            $(".angletop").fadeOut();
        };

    });
    $('.angletop').click(function(e){
        e.preventDefault();
        $('html, body').animate({
            scrollTop: '0'
        } ,300);
    });
    $('.circle-btn-1').click(function(){
        $('.rabbit').show();
    })
}); // jquery

function mySlide(){
    const eq0 = $('.hero .new:eq(0)'); // 최초로 보이는 new
    const eq1 = $('.hero .new:eq(1)'); // 그 뒤에 숨어있는 new
    // animate를 통해 두번째 new에 zindex를 추가하여 제일 앞에 보이게 하고 
    // 투명처리한 후 점차 진하게 보이게 한다.
    eq1.addClass('zindex').css('opacity', 0).animate({
        'opacity': 1
    }, 500, function(){
        // animate 작업이 끝나면 이전에 보였던 new의 zindex를 지우고 가장 나중으로 
        // 바꿔준다.
        eq1.find('li').eq(ranDomList()).addClass('active');
        eq0.removeClass('zindex');
        eq0.find('li').removeClass('active');
        $(".hero").append(eq0);
    });
};

function ranDomList(){
    return Math.floor(Math.random() * 4);
};


function prevEvent(){
    $('.new:first-child').removeClass('zindex');
    $('.new:last-child')
    .addClass('zindex').clone().prependTo('.hero');
    $('.new:last-child').remove();
};
function myTime() {
    let dt = new Date();
    let y = dt.getFullYear();
    let m = dt.getMonth() + 1;
    let d = dt.getDate();
    let h = dt.getHours();
    let mt = `${y}.${m}.${d}.<strong>${h}:00</strong>`;
    $('.thetime').html(mt);
};