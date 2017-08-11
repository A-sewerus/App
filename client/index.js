$(document).ready(function () {
        let phrase
        let $wrapper = $('#test')
        let $wrapperAnswer = $('#answer')

        $.get("http://localhost:1020/task", handlerPhrase)

        function handlerPhrase(data) {
                phrase = data;
                console.log(phrase);
                render(phrase)
        }


        // function render(obj) {
        //         const $ru = $("<div></div>").html(obj.ru);
        //         const $answer = $("<div></div>");
        //         $($answer).attr('id', 'answer');
        //         $wrapper.append($ru).append($answer);
        //         for (let i = 0; i < obj.en.length; i++) {
        //                 const $en = $("<button></button>").html(obj.en[i]);
        //                 $($en).attr('id', 'btn' + i);
        //                 $($en).addClass('button');
        //                 $wrapper.append($en);
        //         }
        //         return $wrapper
        // }

        function render(obj) {
                const $ru = $("<div></div>").html(obj.ru);
                const $answer = $("<div></div>").html(obj.en[3]);
                $($answer).attr('id', 'answer');
                $wrapper.append($ru).append($answer);
                return $wrapper
        }


        console.log('lol');
        $('#answer').click(function (e) {
                console.log('lol');
        });

})

