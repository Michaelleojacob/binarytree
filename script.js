// npx ts-node script.ts
var NodeElement = /** @class */ (function () {
    function NodeElement(data, left, right) {
        if (data === void 0) { data = null; }
        if (left === void 0) { left = null; }
        if (right === void 0) { right = null; }
        this.data = data;
        this.left = left;
        this.right = right;
    }
    return NodeElement;
}());
var Tree = /** @class */ (function () {
    function Tree() {
        this.root = null;
    }
    Tree.prototype.buildtree = function (arr) {
        var uniques = new Set(arr);
    };
    return Tree;
}());
var arr = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324];
var unique = new Set(arr);
console.log(unique);
