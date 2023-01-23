$(document).ready(function() {
    function toObject(arr) {
        var jsonObj = [];
        var headers = arr[0].split(',');
        for (var rowIndex = 1; rowIndex < arr.length; rowIndex++) {
            //TODO fix below problematic row
            if ($.inArray(rowIndex, [86]) != -1) {
                continue;
            }
            if (arr[rowIndex] === '') {
                continue;
            }
            var data = arr[rowIndex].split(',');
            var obj = {};
            for (var colIndex = 0; colIndex < data.length; colIndex++) {
                console.log(rowIndex);
                obj[headers[colIndex].trim()] = data[colIndex].trim().split('"').join('');
            }
            jsonObj.push(obj);
        }
        return jsonObj
    }

    function createP(content, sizeClass, style) {
        if (content === '') {
            return '';
        }
        return '<p class="btn btn-' + style + '" style="margin: 0 5px 5px 0px"><span class="' + sizeClass + '">' + content /*.toString().split(":")[0]*/ + '</span></p><br />';
    }

    function createImg(imageUrl) {
        return '<img src="' + imageUrl + '" style="margin: 0 25px 5px 0px; display: none;" onload="this.style.display=\'\'"\>';
    }
    $.ajax({
        //taken from https://brickset.com/export/mysets/owned/csv
        url: "https://mikiwys.github.io/lego/Brickset-MySets-owned.csv",
        dataType: "text",
        success: function(result) {
            var collection = toObject(result.split(/\r?\n|\r/));
            var data = '';
            collection.forEach(function(element) {
                var adjustedNumber = element.Number.slice(0, -2);
                data += '<div class="row bg-light rounded-lg">';
                data += '<div class="col-1"/>'
                data += '<div class="col-2">'
                data += createP(adjustedNumber, 'h2', 'primary');
                data += createP(element.Theme, 'h6', 'info');
                data += createP(element.Year, '', 'warning');
                data += '</div>';
                data += '<div class=col>'
                data += createImg('https://images.brickset.com/sets/AdditionalImages/' + adjustedNumber + '-1/' + adjustedNumber + '_alt1.jpg');
                data += createImg(element.ImageURL);
                data += '</div>';
                data += '</div>';
            });
            $('#legoCollection').html(data);
        }
    });
});