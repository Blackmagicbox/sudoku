'use strict';
function main() {
    function initializeBoard() {
        const _board = getModel();

        function getModel() {
            const _keys = [...Array.apply(null, {length: 81})].map((v,i) => i + 1);
            let _model = {};
            _keys.forEach(v => _model[v] = {
                value: 0,
                position: v.toString(9),
            });
            return _model;
        }

        function renderBoard() {

        }

    }

    return initializeBoard();
    console.log(window.board);
}

function isValid(pos, value) {
    const _board = Object.assign({}, window.board);
    const [x,y] = pos.split('').map(i => parseInt(i, 10));
    // The pos Variable is the Decimal Index converted to base 9
    function isNatural(){
        return value > 0 && value < 10
    }

    function isUnique(list, value){
        console.log(list);
        return list.every((item) => {
            return _board[parseInt(item, 9)].value !== value
        });
    }

    function isLegal() {
        function checkLine() {
            let line = [];
            if (y === 0) {
                Array.apply(null, {length: 8}).map((v,i) => line.push(`${x-1}${i+1}`));
                line.push(pos);
            } else {
                Array.apply(null, {length: 8}).map((v,i) => line.push(`${x}${i+1}`));
                line.push(parseInt(pos, 10) + 10);
            }
            return isUnique(line, value);
        }
        function checkCol() {
            let col = [...Array.apply(null, {length: 9})].map((v,i) => (`${y === 0 ? i+1 : i}${y}`));
            if (col.indexOf('90') > 0) {
                col.pop() && col.push('100');
            }
            return isUnique(col, value);
        }

        function checkBlock() {
            let _x = y === 0 ? x-1 : x;
            let block = [];
            let col = [];
            let line = [];

            switch (y) {
                case  1:
                case  2:
                case  3:
                    col = [1, 2, 3];
                    break;
                case 4:
                case 5:
                case 6:
                    col = [4,5,6];
                    break;
                default:
                    col = [7, 8, 9];
            }
            switch (_x) {
                case 0:
                case 1:
                case 2:
                    line = [0, 1, 2];
                    break;
                case 3:
                case 4:
                case 5:
                    line = [3, 4, 5];
                    break;
                default:
                    line = [6, 7, 8];
            }

            line.map((l) => col.map((c) => {
                if (c === 9) {
                    return block.push(`${l+1}${0}`)
                }
                return block.push(`${l}${c}`)
            }));
            return isUnique(block, value);
        }
        return checkLine() && checkCol() && checkBlock();
    }
    return isNatural() && isLegal();
}

function handleValueChange(i, value) {
    if (!i) {
        throw new Error('Position is a mandatory parameter!');
    }
    const _pos = i < 9 ? 0+(i).toString(9) : (i).toString(9);

    return isValid(_pos, parseInt(value, 10));
}
window.onload = main();

