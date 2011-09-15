var imgur_api_key = "0cb125cc822632bb809e96a6b2257a8c";

function newPoint(x, y) {
    var Point = {
        x: 0,
        y: 0,
        init: function(x, y) {
            Point.x = x;
            Point.y = y;
        }
    };
    Point.init(x, y);
    return Point;
}

function newRect(x, y, w, h) {
    var Rect = {
        x: 0,
        y: 0,
        w: 0,
        h: 0,
        init: function(x, y, w, h) {
            Rect.x = x;
            Rect.y = y;
            Rect.w = w;
            Rect.h = h;
        },
        x2: function() { return x + w; },
        y2: function() { return x + w; }
        
    };
    Rect.init(x, y, w, h);
    return Rect;
}

var clickX = new Array();
var clickY = new Array();
var clickDrag = new Array();
var paint;
var canvas;
var context;

var cursorCanvas;
var cursorContext;
var cursorRect = 0;
var cursorIntervalId = 0;
var cursorBrushOutlineColor = '#888';

var brushColor = '#df4b26';
var brushSize = 2;

function addClick(x, y, dragging) {
    clickX.push(x);
    clickY.push(y);
    clickDrag.push(dragging);
}

function resizeBrushBy(n) {
    brushSize += n;
}

function redraw() {
    context.strokeStyle = brushColor;
    context.lineJoin = 'round';
    context.lineWidth = brushSize;
    
    for (var i = 0; i < clickX.length; i++) {
        context.beginPath();
        if (clickDrag[i] && i) {
            context.moveTo(clickX[i-1], clickY[i-1]);
        } else {
            context.moveTo(clickX[i]-1, clickY[i]);
        }
        context.lineTo(clickX[i], clickY[i]);
        context.closePath();
        context.stroke();
    }
}

function resizeCanvas(width, height) {
    $('.canvas').attr('width', width).attr('height', height);
    $('#canvas').trigger('resize');
    redraw();
}

function resizeCanvasToScreen() {
    resizeCanvas(document.width - 60, document.height - 60);
}

function drawCursor() {
    if (cursorRect) {
        cursorContext.clearRect(cursorRect.x, cursorRect.y, cursorRect.x2(), cursorRect.y2());
    }
    var mouseX = e.pageX - cursorCanvas.offsetLeft;
    var mouseY = e.pageY - cursorCanvas.offsetTop;
    
    context.beginPath();
    context.arc(mouseX, mouseY, brushSize, 0, Math.PI * 2, false);
    context.closePath();
    context.strokeStyle = cursorBrushOutlineColor;
    context.lineJoin = 'round';
    context.lineWidth = 1;
    context.stroke();
    
    cursorRect = newRect(
        mouseX-brushSize,
        mouseY-brushSize,
        brushSize*2,
        brushSize*2);
}

function loadImage(url) {
    var img = new Image();
    img.src = url;
    img.onload = function() {
        resizeCanvas(img.width, img.height);
        context.drawImage(img, 0, 0);
        $('#toggle').trigger('mousedown');
    }
}

function setImgurData(url, thumbnail_url) {
    if ($('#imgur_thumb').html().length > 0) {
        $('#imgur_thumb').hide('fast');
    }
    $('#imgur_thumb').html('');
    $('#imgur_thumb').append('<div class="center"><a href="'+url+'"><img src="'+thumbnail_url+'" /></a></div>');
    $('#imgur_thumb').show('fast');
}

function parseImgurData(jsonData) {
    $('#imgur_url').val(jsonData.upload.links.original);
    setImgurData(jsonData.upload.links.imgur_page, jsonData.upload.links.small_square);
}

function uploadImageToImgur(canvas, api_key) {
    var blob = getBlob(canvas);
    if (blob === 0) {
        alert("Unsupported");
        return;
    }

    var fd = new FormData();
    fd.append("image", blob); // Append the file
    fd.append("key", api_key);
    
    // Create the XHR
    var xhr = new XMLHttpRequest();
    xhr.open("POST", "http://api.imgur.com/2/upload.json");
    $('#imgur_thumb').html('');
    $('#imgur_thumb').append('<img src="img/ajax-loader.gif" />');
    xhr.onload = function() {
        var imgur_data = JSON.parse(xhr.responseText);
        parseImgurData(imgur_data);
        $('#imgur_thumb').html('');
    }
    //xhr.send(fd);
 }

$(document).ready(function() {
    canvas = document.getElementById('canvas');
    cursorCanvas = document.getElementById('canvas_cursor');
    context = canvas.getContext('2d');
    cursorContext = cursorCanvas.getContext('2d');
    
    $('#canvas').resize(function() {
        $('#width').val(canvas.width);
        $('#height').val(canvas.height);
    });
    resizeCanvasToScreen();
    
    $('#canvas').mousewheel(function(e, delta) {
        resizeBrushBy(delta);
        return false;
    });
    
    $('#canvas_cusor').mouseenter(function(e) {
        cursorIntervalId = setInterval(drawCursor(), 1000/60);
    });
    
    $('#canvas_cusor').mouseleave(function(e) {
        if (cursorIntervalId) {
            clearInterval(cursorIntervalId);
        }
    });
    
    $('.resize').click(function() {
        var width = $(this).val().split(" x ")[0];
        var height = $(this).val().split(" x ")[1];
        resizeCanvas(width, height);
    });
    
    $("input.tag").hover(function() {
        this.focus();
        this.select();
    },function() {
    });
    
    $('#resize_screen').click(function() {
        resizeCanvasToScreen();
    });
    
    $('#width, #height').change(function() {
        resizeCanvas($('#width').val(), $('#height').val())
    });
    
    $('#toggle').mousedown(function() {
        $('#sidebar_content').hide('fast', function() {
            $('#toggle').hover(function() {
                $('#sidebar_content').show();
                $('#toggle').unbind('hover');
            });
        });
    });
    
    $('#load').mousedown(function() {
        loadImage($('#raw_url').val());
    });
    
    $('#upload').click(function() {
        uploadImageToImgur(canvas, imgur_api_key);
    });
    
    $('#canvas').mousedown(function(e) {
        $('#toggle').trigger('mousedown');
        if (e.which == 1) {
            var mouseX = e.pageX - this.offsetLeft;
            var mouseY = e.pageY - this.offsetTop;
        
            paint = true;
            addClick(mouseX, mouseY);
            redraw();
        }
    });
    
    $('#canvas').mousemove(function(e) {
        if (paint) {
            var mouseX = e.pageX - this.offsetLeft;
            var mouseY = e.pageY - this.offsetTop;
            
            addClick(mouseX, mouseY, true);
            redraw();
        }
    });
    
    $('#canvas').mouseup(function(e){
        paint = false;
    });
    
    $('#canvas').mouseenter(function(e){
        if (e.which == 0) {
            paint = false;
        }
    });
    
    $(document).mouseleave(function(e){
        paint = false;
    });
});

