/* Source: http://mustachified.com/ */



var dataURItoBlob = function(dataURI, callback) {
    // convert base64 to raw binary data held in a string
    // doesn't handle URLEncoded DataURIs
    var byteString = atob(dataURI.split(',')[1]);

    // separate out the mime component
    var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0]

    // write the bytes of the string to an ArrayBuffer
    var ab = new ArrayBuffer(byteString.length);
    var ia = new Uint8Array(ab);
    for (var i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
    }

    // write the ArrayBuffer to a blob, and you're done
    var BlobBuilderObj = new (window.BlobBuilder || window.WebKitBlobBuilder)();
    BlobBuilderObj.append(ab);
    return BlobBuilderObj.getBlob(mimeString);
};

function getBlob(canvas) {
    var hasSupportForCrossDomainUpload = (
            typeof FormData !== 'undefined' && 
            typeof XMLHttpRequest !== 'undefined' &&
            canvas.mozGetAsFile
        );
        
    var hasSupportForBlobBuilding = (
            typeof ArrayBuffer !== 'undefined' && 
            typeof Uint8Array !== 'undefined' && 
            (typeof BlobBuilder !== 'undefined' ||
            typeof WebKitBlobBuilder !== 'undefined')
        );
    
    if (hasSupportForCrossDomainUpload || hasSupportForBlobBuilding) {
        return canvas.mozGetAsFile 
            ? canvas.mozGetAsFile('drawing.png')
            : dataURItoBlob(canvas.toDataURL('image/png'));
    } else {
        return 0;
    }
}