function drawLuckyNumbersIn(element) {

    var NUMBER_OF_ALL_SUMS_IN_3N_NUMBERS = 999 + 1;

    var cnt = 0;
    var resultElement = document.createDocumentFragment();

    var sums = new Array(NUMBER_OF_ALL_SUMS_IN_3N_NUMBERS);
    for (var i = 0; i < sums.length; i++) {
        sums[i] = sum(i);
    }

    var currentSum;
    for (i = 0; i <sums.length; i++) {
        currentSum = sums[i];
        for (var j = 0; j < sums.length; j++) {
            if (sums[j] === currentSum) {
                drawNumber(i, j);
            }
        }
    }

    renderResult();

    /**
     *  Render lucky number in element with parts i and j
     * @param i - part
     * @param j - part
     */
    function drawNumber(i, j) {
        var el = document.createElement("div");
        el.innerHTML = cnt + ": " + i  + j;
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
}