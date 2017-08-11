$(document).ready(function () {
        let phrase;
        let $wrapper = $('#main');
        let $wrapperRu = $('#ru');
        let $wrapperReplyField = $('#replyField');
        let $wrapperBtn = $('#answer')

        $.get("http://localhost:1020/task", handlerPhrase)

        function handlerPhrase(data) {
                phrase = data;
                console.log(phrase);
                render(phrase)
        }


        function render(obj) {
                $wrapperRu.html(obj.ru);
                $wrapper.append($wrapperRu).append($wrapperReplyField)
                .append($wrapperBtn).append(renderPhrase(obj.en));
                return $wrapper
        }

        function renderPhrase(arr) {
                let $ul = $('<ul></ul>');
                for (let i = 0; i < arr.length; i++) {
                        let $li = $('<li></li>');
                        let $btn = $('<button></button>').html(arr[i]);
                        $li.append($btn);
                        $ul.append($li);
                }
                return $ul
        }

        $('#answer').click(function (e) {
                let word = $('#answer').text();
                console.log(word);
        });

})

