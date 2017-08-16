/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

const config = __webpack_require__(1)

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




/***/ }),
/* 1 */
/***/ (function(module, exports) {

module.exports = {
        server: {
                port: 1020
        },
        db: {
                path: '../db/phrases.json'
        },
        client: {
                urlTask: 'http://localhost:1020/task',
                urlAnswer: 'http://localhost:1020/answer'
        }
}

/***/ })
/******/ ]);