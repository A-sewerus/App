const config = require('../server/config')

$(document).ready(function () {
        let phrase;
        let score = 0;
        let $wrapper = $('#main');
        let $wrapperScore = $('#Score');
        let $wrapperRu = $('#ru');
        let $wrapperReplyField = $('#replyField');
        let $wrapperEn = $('#en');
        let $wrapperBtn = $('#answer');
        let $wrapperBtnNext = $('#next');
        let $wrapperBtnClear = $('#clear');
        let $wrapperBtnFinish = $('#finish');
        let fullAnswer = {};
        let result = [];

        $.get(config.client.urlTask, handlerPhrase)

        function handlerPhrase(data) {
                phrase = data;
                fullAnswer.id = phrase.id;
                render(phrase)
        }

        function render(obj) {
                $wrapper.append($wrapperScore)
                        .append($wrapperRu.html(phrase.ru))
                        .append($wrapperReplyField)
                        .append($wrapperBtn)
                        .append($wrapperBtnNext)
                        .append($wrapperBtnClear)
                        .append($wrapperBtnFinish)
                        .append($wrapperEn.append(renderPhraseEn(phrase.en)));
                return $wrapper
        }

        function renderPhraseEn(arr) {
                let $ul = $('<ul></ul>');
                for (let i = 0; i < arr.length; i++) {
                        let $li = $('<li></li>');
                        let $btn = $('<button></button>').html(arr[i]);
                        $($btn).attr('type', 'button');
                        $($btn).addClass("btn block");
                        $btn.click(onClickHandler($btn));
                        $li.append($btn);
                        $ul.append($li);
                }
                return $ul
        }

        function renderAnswer(str) {
                let $word = $('<div></div>').html(str);
                let space = ' ';
                $($word).addClass("text")
                return $wrapperReplyField.append($word).append(space);
        }

        const onClickHandler = (button) => {
                return () => {
                        let text = $(button).text();
                        renderAnswer(text);
                        $(button.parent()).remove();
                        result.push(text);

                }
        }

        function nextPhrase() {
                $wrapperRu.html('');
                $wrapperEn.html('');
                $wrapperReplyField.html('');
                result.splice(0, result.length);
                $.get(config.client.urlTask, handlerPhrase);
        }

        $('#answer').click(function () {
                fullAnswer.answer = result.join(' ');
                $.post(config.client.urlAnswer, fullAnswer, function (data) {
                        let $score = $('<div></div>').html(data);
                        score += +data;
                        +data === 0 ?
                                $($score).addClass("scorefalse") :
                                $($score).addClass("scoretrue");
                        $wrapperScore.append($score);
                })
                nextPhrase();
        })

        $('#next').click(nextPhrase)

        $('#clear').click(function () {
                $wrapperReplyField.html('');
                $wrapperEn.html('');
                result.splice(0, result.length);
                $wrapperEn.append(renderPhraseEn(phrase.en));
        })

        $('#finish').click(function () {
                let $finish = $('#finish');
                let $classBlock = $(".block");
                if ($finish.text() === 'Закончить') {
                        $classBlock.prop('disabled', true);
                        let $score = $('<div></div>').html(score);
                        $($score).addClass("scoreFinish");
                        $wrapperScore.append($score);
                        $finish.html('Начать');
                } else {
                        $finish.html('Закончить');
                        $classBlock.prop('disabled', false);
                        $wrapperScore.html('');
                        nextPhrase();
                }
        })
})


