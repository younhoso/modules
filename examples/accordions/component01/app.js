(function() {
    console.log(tr)
    new tr.Accordions ({
        targets: '.faq_component',
        event: 'click', // 이벤트 mouseenter와, click 2가지를 옵션으로 넣을수 있습니다.
        firstItemActive: true, // 첫번째 아이템을 활성화 할건지 여부체크 true or false
        addClassName: 'active',
        //duration: 0.4, // 활성화되는 시간을 컨트롤 할수 있습니다.(기본 값으로 0.4초를 가지고 있습니다.)
        //autoplay: 1000, // 각각의 리스트를 자동으로 플레이를 시키고, 몇초 간격으로 할것인지 설정할수 있습니다.(autoplay property key가 없다면 자동플레이는 실행되지 않는다.)
        additems: 4, // 자동플레이 항목 객수를 제안 할수 있습니다.
        loop: false, // autoplay를 무한 반복 시킬것인지 여부체크 true or false (기본 값으로 false)
    });

    new tr.Item({
        targets: {
            startEl: '.faq_component',       // 컴포넌트 상의 루트(Element)를 시작 선택자로 선언 합니다.
            endEl: '.tr_item',              // 컴포넌트 상의 리스트들(Element)를 끝나는 선택자로 선언 합니다.
            eventEl: '.btn-wrap-js'          // 더보고 혹은 (숫자 증가) 기능 추가할경우, 클릭 대상의 Components를 선택자로 선언 합니다.
        },
        additems: 4,                                     // 추가 하고 싶은 항목의 객수를 뜻합니다.(1개 이상의 값을 넣어야만 실행 가능합니다.)
        addClassName: "more_active",                     // numbering이라는 클래스 위치에 또다른 클래스를 추가할수 있습니다.
        template: function(idIdx, current, total, addClassName="none") {      // template라는 키로 더보기 버튼 템플릿을 직접 만들수 있습니다.
            return `<a href="javascript:;" class="numbering ${addClassName}">
                <span>MORE</span>
                <span data-id="${idIdx}" class="current">${current}</span>
                <span> / </span>
                <span class="total">${total}</span>
            </a>`
        }
    });
})();