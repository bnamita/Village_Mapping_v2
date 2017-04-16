function fixdata(data) {
    var o = "", l = 0, w = 10240;
    for(; l<data.byteLength/w; ++l) o+=String.fromCharCode.apply(null,new Uint8Array(data.slice(l*w,l*w+w)));
    o+=String.fromCharCode.apply(null, new Uint8Array(data.slice(l*w)));
    return o;
}

function to_json(workbook) {
    var result = {};
    workbook.SheetNames.forEach(function(sheetName) {
        var roa = XLSX.utils.sheet_to_row_object_array(workbook.Sheets[sheetName]);
        if(roa.length > 0){
            result[sheetName] = roa;
        }
    });
    return result;
}

function to_csv(workbook) {
    var result = [];
    workbook.SheetNames.forEach(function(sheetName) {
        var csv = XLSX.utils.sheet_to_csv(workbook.Sheets[sheetName]);
        if(csv.length > 0){
            //result.push("SHEET: " + sheetName);
            //result.push("");
            result.push(csv);
        }
    });
    return result.join("\\n");
}


function process_wb(wb) {
    var output = to_csv(wb);
    //if(out.innerText === undefined) out.textContent = output;
    //else out.innerText = output;
    console.log(output)
    return output;
}

function handleFile(e) {
    var files = e.target.files;
    var f = files[0];
    var reader = new FileReader();
    var name = f.name;
    reader.onload = function(e) {
        var data = e.target.result;
        var wb;
        var arr = fixdata(data);
        wb = XLSX.read(btoa(arr), {type: 'base64'});
        var output = process_wb(wb);
        return output;

    };

    reader.readAsArrayBuffer(f);

}