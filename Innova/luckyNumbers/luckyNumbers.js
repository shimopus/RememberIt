/**
 * Render all lucky numbers from 000000 to 999999
 *
 * @param element
 */
function drawLuckyNumbersIn(element) {
    var NUMBER_OF_ALL_SUMS_IN_3N_NUMBERS = 999 + 1;//+1 - 000
    var MAX_SUMM_OF_3N_NUMBER = 27 + 1;//+1 - 000

    var cnt = 0;
    var resultElement = document.createDocumentFragment();

    var i = 0;
    var interval = setInterval(function () {
        worker(i, i += 10);
        renderResult();
        if (i >= NUMBER_OF_ALL_SUMS_IN_3N_NUMBERS) {
            clearInterval(interval);
        }
    }, 0);

    /**
     * Draws all lucky numbers with numbers `from` to `to`
     *
     * @param from
     * @param to
     */
    function worker(from, to) {
        var currentSum;

        if (!worker.sums) {
            worker.sums_numbers = new Array(MAX_SUMM_OF_3N_NUMBER);
            worker.sums = new Array(NUMBER_OF_ALL_SUMS_IN_3N_NUMBERS);

            for (var i = 0; i < NUMBER_OF_ALL_SUMS_IN_3N_NUMBERS; i++) {
                currentSum = sum(i);
                worker.sums[i] = currentSum;

                if (!worker.sums_numbers[currentSum]) {
                    worker.sums_numbers[currentSum] = [];
                }
                worker.sums_numbers[currentSum].push(i);
            }
        }

        for (i = from; i < to; i++) {
            currentSum = worker.sums[i];
            var numbers = worker.sums_numbers[currentSum];
            if (numbers) {
                for (var j = 0; j < numbers.length; j++) {
                    drawNumber(i, numbers[j]);
                }
            }
        }

        /*if (!worker.sums) {
            worker.sums = new Array(NUMBER_OF_ALL_SUMS_IN_3N_NUMBERS);
            for (var i = 0; i < worker.sums.length; i++) {
                worker.sums[i] = sum(i);
            }
        }

        var currentSum;
        for (i = from; i < to; i++) {
            currentSum = worker.sums[i];
            for (var j = 0; j < worker.sums.length; j++) {
                if (worker.sums[j] === currentSum) {
                    drawNumber(i, j);
                }
            }
        }*/
    }

    /**
     *  Render lucky number in element with parts i and j
     * @param i - part
     * @param j - part
     */
    function drawNumber(i, j) {
        var el = document.createElement("div");
        el.innerHTML = cnt + ": " + padLeft(i, 3)  + padLeft(j, 3);
        resultElement.appendChild(el);
        cnt++;
    }

    /**
     * Renders results at element
     */
    function renderResult() {
        if (element.appendChild) {
            element.appendChild(resultElement);
        } else {
            element.innerHTML = "WRONG PARAMETER element of drawLuckyNumbersIn()"
        }
    }

    /**
     * Return sum of each digit of the number
     * @param i - number
     */
    function sum(i) {
        var retSum = 0;

        while (i) {
            retSum += i % 10;
            i = Math.floor(i / 10);
        }

        return retSum;
    }

    /**
     * Adds 0 at the start of number to make number with specific length
     *
     * @param length
     * @return {String}
     */
    function padLeft(number, length) {
        return new Array(length - number.toString().length + 1).join('0') + number;
    }
}

document.addEventListener("DOMContentLoaded", function() {
    var btn = document.getElementById("btn");
    btn.addEventListener("click", function () {
        var hello = document.getElementById("hello");
        hello.setAttribute("style", "color: red");
        hello.innerHTML += "!";
    }, false);

    var element = document.getElementById("luckyNumbers");
    drawLuckyNumbersIn(element);
}, false);