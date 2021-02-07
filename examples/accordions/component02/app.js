(function() {
    console.log(tr)
    new tr.Accordions ({
        targets: '.tr_item',
        event: 'click',            // 이벤트 mouseenter와, click 2가지를 옵션으로 넣을수 있습니다.
        firstItemActive: true           // 첫번째 아이템을 활성화 할건지 여부체크 true or false
    });

    new tr.Ratio({
        targets: {
            startEl: '.faq_component',       // 컴포넌트 상의 루트(Element)를 시작 선택자로 선언 합니다.
            endEl: '.tr_item',              // 컴포넌트 상의 리스트들(Element)를 끝나는 선택자로 선언 합니다.
            eventEl: '.btn-wrap-js'          // 더보고 혹은 (숫자 증가) 기능 추가할경우, 클릭 대상의 Components를 선택자로 선언 합니다.
        },
        additems: 3,                                     // 추가 하고 싶은 항목의 객수를 뜻합니다.(1개 이상의 값을 넣어야만 실행 가능합니다.)
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