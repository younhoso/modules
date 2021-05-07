(function() {
    console.log(tr)
    new tr.Accordions ({
        targets: '.faq_component',
        firstItemActive: true, // 첫번째 아이템을 활성화 할건지 여부체크 true or false (기본 값으로 false)
        duration: 0.8, // 활성화되는 시간을 컨트롤 할수 있습니다.(기본 값으로 0.4초를 가지고 있습니다.)
        autoplay: false, // 각각의 리스트를 자동으로 플레이를 시킬지 여부체크 true or false (기본 값으로 false)
        loop: false, // autoplay를 무한 반복 시킬것인지 여부체크 true or false (기본 값으로 false)
        eventClick(e){  // 이벤트 클릭에 콜백 정의 (필수 입력값입니다.)
            const _selfSib = $(e.currentTarget).siblings().find('.tr_acc_box');
            const _self = $(e.currentTarget).find('.tr_acc_box');
            this.unactive(_selfSib); // height: 0의 스타일 정의되어 있습니다. 인자로 비활성화 시킬 target나머지 들을 넣으세요.
            this.active(_self); // height: 'auto'의 스타일 정의되어 있습니다. 인자로 활성화 시킬 target을 넣으세요.
        }
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