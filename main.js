'use strict';
function main() {
    function initializeBoard() {
        const _keys = [...Array.apply(null, {length: 81})].map((v,i) => i + 1);
        let _model = {};
        _keys.forEach(v => _model[(v).toString()]= 0);
        return _model;
    }
    window.board = initializeBoard();
    console.log(window.board);
}
window.onload = main();

