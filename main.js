'use strict';
function main() {
    window.board = initializeSudokuBoard();

    function initializeSudokuBoard() {
        const _board = getBoardModel();
        function getBoardModel(){
            function generateLine(content) {
                let _content = content || 0;
                return Array.apply(null,{length:3}).fill(_content);
            }
            function sudokuMatrix() {
                function getMxL () {
                    return generateLine()
                }
                return generateLine(getMxL());
            }
            function getRows() {
                return generateLine(sudokuMatrix());
            }
            return generateLine(getRows());
        }
        console.log(_board);
        return _board;
    }
    return window.board;
}

function handleValueChange(pos, value, board) {
    // let isValid = checkValue();
    function checkValue() {
        function isNatural(value){
            return value > 0 && value < 9;
        }
        function isUnique(list) {
            return list.indexOf(value) < 0;
        }
        function isLegal() {
            function getMatrix() {
                let _matrix = [];
                 board[pos.row][pos.col].map(function (line) {
                    return _matrix.push(line);
                 });
                 return _matrix.join().split(',').map(function (item) {
                     return parseInt(item, 10);
                 });
            }
            function getRow() {
                let _row = [];
                board[pos.row].map(function (group) {
                    _row.push(group[pos.line]);
                });
                return _row.join().split(',').map(function (item) {
                    return parseInt(item, 10);
                })
            }

            function getCol() {
                let _col = [];
                board.map(function (col) {
                    return col[pos.col].map(function (group) {
                        return group.map(function (line) {
                            _col.push(line[pos.index]);
                        })
                    })
                })
                return _col.join().split(',').map(function (item) {
                    return parseInt(item, 10);
                })
            }
            return isUnique(getMatrix()) && isUnique(getRow()) && isUnique(getCol());
        }

        return (isNatural(value) && isLegal());
    }
    // return isValid;
    return checkValue();
}

window.onload = main();

