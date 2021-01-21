export default class ScrollInfinite {
    constructor (apiData, ...rest) {
        this.apiData = apiData
        this.rest = rest
        this.done = false
        this.current = 0
        this.addItems = 0
        this.length = 0
        this.adds = 0
        this.Evadds = 0
        this.copyData = 0
        this.scrollinfinite()
    }
    scrollinfinite () {
        const _self = this
        const { container, length } = this.rest[0]
        // const { el, type } = this.rest[0].pagination
        let addItem = []
        // let totalPage = 0

        const active = () => {
            return new Promise((resolve, reject) => {
                $.get(this.apiData, function (res) {
                    if (!_self.apiData) {
                        reject(new Error('API 주소를 확인해주세요!!'))
                    }
                    resolve(res)
                })
            })
        }

        active().then(function (data) {
            _self.copyData = $.extend(true, [], data) // 제이쿼리 메서드중 $.extend, 데이터 깊은(true) 복사 기능
            _self.copyData.forEach((el, _) => { // 데이터 중심으로 돌리는 코드
                _self.current = el
                $(container).append(_self.templateItem(el))
            })
            $('li.tl-list').each(function (idx, item) { // DOM 중심으로 돌리는 코드
                if (!length && (idx + 1) > 10) { // default로 10개만 뿌립니다.
                    $(this).addClass('hide')
                }

                if (idx >= length) { // length 길이 만큼 노출됩니다.
                    $(this).addClass('hide')
                }
                addItem.push(item)
                // totalPage = Math.floor(addItem.length / length)
            })
        }).catch(function (err) {
            alert(err)
        }).finally(function () {
            alert('tttt')
        })
    }

    templateItem (data) { // 리스트(항목들) 템플릿
        let template = ''
        template += '<li class="tl-list">'
        template += '<a href="' + data.id + '">' + data.id + '</a>'
        template += '</li>'
        return template
    }
    templateLength (addNmmer, total = 10) { // 객수를 세어주는 템플릿
        let template = ''
        template += '<a href="#0" class="current">' + addNmmer + '/' + total + '</a>'
        return template
    }
    addItemEvnet () {
        const { length, add } = this.rest[0]
        let addItem = { length, add, current: 0, index: 0 }
        const divide = length - add

        $('.ti-btn-more').on('click', (e) => {
            const endItem = length + addItem.add

            $('li.tl-list').each(function (idx, item) { // DOM 중심으로 돌리는 코드
                if (idx < endItem) { $(this).removeClass('hide') }
                addItem.index = idx + 1
            })
            addItem.add += add // 클릭이벤트를 할때마다 add만큼 증가한다.
            if ((addItem.add + divide) >= addItem.index) { // (추가되는 개수와 + 사용자가 작성한 숫자들과) === DOM에 전체 인덱츠 값 비교를해 item이 모두 노출되면 '더보기' 버튼 사라짐
                $('.ti-btn-pagination').empty()
                return false
            }
        })

        const DataLength = Math.floor(this.copyData.length / length)

        $('.ti-btn-pagination').on('click', (e) => {
            $('li.tl-list').each(function (idx) { // DOM 중심으로 돌리는 코드
                const endItem = length + addItem.add
                if (idx < endItem) { $(this).removeClass('hide') }
            })
            addItem.current += 1

            addItem.add += add // 클릭이벤트를 할때마다 add만큼 증가한다.
            $('.ti-btn-pagination').html(this.templateLength((addItem.current + 1), DataLength)) // 클릭시 개수 1씩 증가기능
        })
    }
};