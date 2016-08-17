/**
 * create by Souleigh  17/06/2016
 */ 

// 根据ID获取获取所需的元素
var puzzBox = document.getElementById('puzzBox');//图片显示区域
var startGame = document.getElementById('startGame');//开始游戏按钮
var setLevel = document.getElementById('setLevel');//难度选择按钮

var hasStart = 0;//记录游戏是否已经开始，默认未开始
var divCount = [];//定义游戏难度数组
var origOrder = [];//图片拆分后，存储正确排序的数组
var ranOrder = [];//图片拆分并打乱后，存储当前排序的数组
var origArr = [];//记录图片拆分后图片放置的位置
var ranArr = [];//记录图片拆分并打乱后图片放置的位置
var origXArr = [];//图片拆分后，存储每个碎片left值的数组
var origYArr = [];//图片拆分后，存储每个碎片top值的数组
divCount = [3, 4, 6];//存储难度的数组
var lev = 0;//定义当前难度，此处为难度数组的索引
initialGame();//初始化游戏，使屏幕显示3x3方格

//初始化游戏函数
function initialGame() {
    //清空各个相关的数组及图片显示区域，避免切换难度时碎片叠加
    origArr = [];
    ranArr = [];
    origXArr = [];
    origYArr = [];
    origOrder = [];
    puzzBox.innerHTML = "";
    //根据图片显示区域的宽度、高度以及当前难度获取每个图片碎片的宽度和高度
    var divWidth = puzzBox.offsetWidth / divCount[lev];
    var divHeight = puzzBox.offsetHeight / divCount[lev];
    for (var i = 0; i < divCount[lev]; i++) {
        for (var j = 0; j < divCount[lev]; j++) {
            origOrder.push(i * divCount[lev] + j);//记录游戏开始时图片放置的位置
            var div = document.createElement('div');
            div.classList.add('puzzItem');//为每个碎片添加类名
            puzzBox.appendChild(div);
            div.style.width = divWidth;
            div.style.height = divHeight;
            var origY = div.style.top = i * divHeight + 'px';
            var origX = div.style.left = j * divWidth + 'px';
            //图片根据当前难度拆分成对应数量的碎片
            div.style.backgroundSize = divCount[lev] * 100 + "%";
            div.style.backgroundPosition = (-j) * divWidth + 'px ' + (-i) * divHeight + 'px';
            setLevel.innerHTML = divCount[lev] + 'x' + divCount[lev];//难度按钮的文本根据按钮变换文本内容
            origXArr.push(origY);//拆分后，把每个碎片的top值存入数组
            origYArr.push(origX);//拆分后，把每个碎片的left值存入数组
        }
    }
    //把储存top值的数组和储存left值的数组拼接成一个记录拆分后原始位置的数组
    for (var k = 0; k < origXArr.length; k++) {
        origArr.push([origYArr[k], origXArr[k]]);
    }
    //打乱储存原始位置数组中元素的位置
    ranArr = origArr.sort(randomSort);
    //获取打乱后原始位置数组中元素的顺序
    ranOrder = divOrder(ranArr);
    // console.log(ranArr)
    // console.log(ranOrder)
}

//用Math.random()函数生成0~1之间的随机数与0.5比较，返回-1或1
//当函数返回值为1的时候就交换两个数组项的顺序，否则就不交换。
function randomSort(a, b) {
    return Math.random() > .5 ? -1 : 1;
}
//开始游戏按钮点击事件
startGame.onclick = function startGame() {
    var startGame = document.getElementById('startGame');//开始游戏按钮
    if (hasStart == 0) {
        var divs = document.querySelectorAll('.puzzItem');
        for (var i = 0; i < ranArr.length; i++) {
            //根据随机数组打乱碎片位置
            divs[i].style.top = ranArr[i][1];
            divs[i].style.left = ranArr[i][0];
        }
        hasStart = 1;
        startGame.innerHTML = '重新开始';
        Drag();
    } else if (hasStart == 1) {
        if (confirm('确定要重新开始？')) {
            initialGame();
            hasStart = 0;
            startGame.innerHTML = '开始游戏';
        }
    }
}
//难度选择按钮点击事件
setLevel.onclick = function setLevel() {
    if (hasStart == 1) {
        if (confirm('确定要改变游戏难度？')) {
            lev++;//每点击一次按钮，难度增加
            if (lev == 3) {
                lev = 0;//当难度增加到6x6时，再次点击时，难度恢复为3x3
            }
            initialGame();//改变难度后重新初始化游戏
            startGame.innerHTML = '开始游戏';
            hasStart = 0;
        }
    }
    else {
        lev++;//每点击一次按钮，难度增加
        if (lev == 3) {
            lev = 0;//当难度增加到6x6时，再次点击时，难度恢复为3x3
        }
        initialGame();//改变难度后重新初始化游戏
        hasStart = 0;
    }
}

//拖动图片碎片
function Drag() {
    var divs = document.querySelectorAll('.puzzItem');
    var isMouseDown;
    var startX;
    var startY;
    var zIndex = 0;
    for (var i = 0; i < divs.length; i++) {
        divs[i].index = i;
        //鼠标向下点击事件
        divs[i].onmousedown = function (event) {
            event = event || window.event;
            zIndex++;
            isMouseDown = true;
            //获取拖动的图片碎片的下标以及鼠标相对该碎片的位置
            var divIndex1 = this.index;
            startX = event.pageX - this.offsetLeft;
            startY = event.pageY - this.offsetTop;
            this.style.zIndex = zIndex;
            this.style.transitionProperty = 'none';
            this.style.cursor = 'move';
            // console.log('down-' + this.index)
        }
        //鼠标点击后的移动事件
        divs[i].onmousemove = function (event2) {
            if (isMouseDown) {
                var divIndex1 = this.index;
                this.style.left = event2.pageX - startX + 'px';
                this.style.top = event2.pageY - startY + 'px';
                // console.log('move-' + this.index)
            }
        }
        //鼠标松开后的事件
        divs[i].onmouseup = function (event3) {
            var divIndex1 = this.index;
            isMouseDown = false;
            // console.log('up-' + this.index)
            // console.log('--------------------')
            //被交换的碎片的下标
            var mouseupX = event3.pageX - puzzBox.offsetLeft;
            var mouseupY = event3.pageY - puzzBox.offsetTop;
            var divIndex2 = changeIndex(mouseupX, mouseupY, divIndex1);
            this.style.transitionProperty = 'all';
            if (divIndex1 == divIndex2) {
                returnPos(divIndex1);
            }
            else {
                divExchange(divIndex1, divIndex2);
            }
            // console.log('divIndex1--' + divIndex1 + '--->' + 'divIndex2--' + divIndex2)
            // console.log('------------------')
        }
    }
}
//两块图片碎片进行交换的函数
function divExchange(initial, final) {
    var divWidth = puzzBox.offsetWidth / divCount[lev];
    var divHeight = puzzBox.offsetHeight / divCount[lev];
    var divs = document.querySelectorAll('.puzzItem');
    var rowInitial = Math.floor(ranOrder[initial] / divCount[lev]);
    var colInitial = ranOrder[initial] % divCount[lev];
    var rowFinal = Math.floor(ranOrder[final] / divCount[lev]);
    var colFinal = ranOrder[final] % divCount[lev];
    var temPos = ranOrder[initial];
    divs[final].style.top = rowInitial * divHeight + 'px';
    divs[final].style.left = colInitial * divWidth + 'px';
    divs[initial].style.top = rowFinal * divHeight + 'px';
    divs[initial].style.left = colFinal * divWidth + 'px';
    ranOrder[initial] = ranOrder[final];
    ranOrder[final] = temPos;
    if (checkSuccess(origOrder, ranOrder)) {
        successDo();
        alert('恭喜完成游戏，哈哈');
    }
}
//被拖动图片返回原位置的函数
function returnPos(index) {
    var divWidth = puzzBox.offsetWidth / divCount[lev];
    var divHeight = puzzBox.offsetHeight / divCount[lev];
    var divs = document.querySelectorAll('.puzzItem');
    var row = Math.floor(ranOrder[index] / divCount[lev]);
    var col = ranOrder[index] % divCount[lev];
    divs[index].style.top = row * divHeight + 'px';
    divs[index].style.left = col * divWidth + 'px';
}
//计算被交换的碎片下标的函数
function changeIndex(x, y, orig) {
    if (x < 0 || x > puzzBox.offsetWidth || y < 0 || y > puzzBox.offsetHeight) {
        return orig;
    }
    var divWidth = puzzBox.offsetWidth / divCount[lev];
    var divHeight = puzzBox.offsetHeight / divCount[lev];
    var row = Math.floor(y / divHeight);
    var col = Math.floor(x / divWidth);
    var location = row * divCount[lev] + col;
    var i = 0;
    while ((i < ranOrder.length) && (ranOrder[i] != location)) {
        i++;
    }
    // console.log('i---' + i);
    // console.log('location---' + location);
    return i;
}
//计算打乱后碎片原来的下标位置
function divOrder(arr) {
    var temOrder = [];
    var divWidth = puzzBox.offsetWidth / divCount[lev];
    var divHeight = puzzBox.offsetHeight / divCount[lev];
    var divs = document.querySelectorAll('.puzzItem');
    for (var i = 0; i < arr.length; i++) {
        //因为数组内元素都带有单位px，计算时需要把px去掉
        var row = Math.floor((arr[i][1].substr(0, arr[i][1].length - 2)) / divHeight);
        var col = Math.floor((arr[i][0].substr(0, arr[i][0].length - 2)) / divWidth);
        var origPos = row * divCount[lev] + col;
        temOrder.push(origPos);
    }
    return temOrder;
}
//判断游戏是否成功的函数
function checkSuccess(rightArr, puzzleArr) {
    if (rightArr.toString() == puzzleArr.toString()) {
        return true;
    }
    else {
        return false;
    }
}
//游戏成功后执行的事件函数
function successDo() {
    var divs = document.querySelectorAll('.puzzItem');
    for (var i = 0; i < divs.length; i++) {
        divs[i].onmousedown = null;
        divs[i].onmousemove = null;
    }
    initialGame();
}







