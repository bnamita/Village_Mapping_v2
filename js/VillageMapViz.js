function VillageMapViz() {};

VillageMapViz.prototype = {
    setup: function(args) {
        // setup variables
        this.district_name = "Ahmadnagar";
        this.field_name = "Total.Population.of.Village";
        this.districtMap = new DistrictMap_Leaflet();
        this.isCustom = false;
        this.csv = undefined;
        this.customFieldToMatch = "Village.Code";
        // call to create leaflet map
        this.createMap();

        // populate attribute list
        //this.createAttrList();
        this.createGroupedAttrList();

        // populate district list
        this.createDistrictList();

        // attach change events for district and attribute
        this.attachEvents();

        // for saving image
        $(".leaflet-control").attr("data-html2canvas-ignore",true);
        $(".legend-control")[0].removeAttribute("data-html2canvas-ignore");
        $(".info-control")[0].removeAttribute("data-html2canvas-ignore");
    },

    createMap: function () {
        this.districtMap.setup({
            divId: 'map_container',
            district_name: this.district_name,
            field_name: this.field_name
        });
    },

    createGroupedAttrList: function(fields) {
        var self = this,
            csv_metadata = census_grouped_variables,
            selectHTML = "";

        if (self.isCustom && fields !== undefined) {
            for (var i = 0; i < fields.length; i++) {
                selectHTML += "<option value='" + fields[i] + "'>" + fields[i] + "</option>";
            }
                $('#box').html(selectHTML);
                $('#box').val(fields[1]);
                self.districtMap.setFieldName(fields[1]);
                var attrList = $("#box").select2({
                    //matcher: modelMatcher
                }).maximizeSelect2Height({
                    cushion: 150
                });

        } else {
            for (var key in csv_metadata) {
                if (csv_metadata.hasOwnProperty(key)) {
                    //console.log(key + " -> " + p[key]);
                    selectHTML += "<optgroup label='" + key + "'>";
                    for (var i = 0; i < csv_metadata[key].length; i++) {
                        selectHTML += "<option value='" + csv_metadata[key][i].name + "'>" + csv_metadata[key][i].name + "</option>";
                    }
                    selectHTML += "</optgroup>"
                }
                $('#box').html(selectHTML);
                $('#box').val('Total Population');

                function modelMatcher(params, data) {
                    data.parentText = data.parentText || "";

                    // Always return the object if there is nothing to compare
                    if ($.trim(params.term) === '') {
                        return data;
                    }

                    // Do a recursive check for options with children
                    if (data.children && data.children.length > 0) {
                        // Clone the data object if there are children
                        // This is required as we modify the object to remove any non-matches
                        var match = $.extend(true, {}, data);

                        // Check each child of the option
                        for (var c = data.children.length - 1; c >= 0; c--) {
                            var child = data.children[c];
                            child.parentText += data.parentText + " " + data.text;

                            var matches = modelMatcher(params, child);

                            // If there wasn't a match, remove the object in the array
                            if (matches == null) {
                                match.children.splice(c, 1);
                            }
                        }

                        // If any children matched, return the new object
                        if (match.children.length > 0) {
                            return match;
                        }

                        // If there were no matching children, check just the plain object
                        return modelMatcher(params, match);
                    }

                    // If the typed-in term matches the text of this term, or the text from any
                    // parent term, then it's a match.
                    var original = (data.parentText + ' ' + data.text).toUpperCase();
                    var term = params.term.toUpperCase();


                    // Check if the text contains the term
                    if (original.indexOf(term) > -1) {
                        return data;
                    }

                    // If it doesn't contain the term, don't return anything
                    return null;
                }

                var attrList = $("#box").select2({
                    matcher: modelMatcher
                }).maximizeSelect2Height({
                    cushion: 150
                });
            }

        }

    },

    createFileColList: function(fields) {
        var self = this,
            selectHTML = "";

        if (self.isCustom && fields !== undefined) {
            for (var i = 0; i < fields.length; i++) {
                selectHTML += "<option value='" + fields[i] + "'>" + fields[i] + "</option>";
            }
            $('#col-list').html(selectHTML);
            $('#col-list').val(fields[1]);
            self.districtMap.setFieldName(fields[1]);
            var attrList = $("#col-list").select2();

        }

    },

    createAttrList: function () {
        var self = this;

        // attribute list comes from census_fields_meta.csv
        d3.csv("./data/metadata/census_fields_meta.csv", function (csv_metadata) {

            var colArr = [],
                selectHTML = "";
            for (var i = 0; i < csv_metadata.length; i++) {
                if (csv_metadata[i]['column'].indexOf('(If not available within the village') === -1) {
                    colArr.push(csv_metadata[i]['column']);
                }
            }

            for( i = 0; i < colArr.length; i++) {
                selectHTML+= "<option value='"+ colArr[i] + "'>" + colArr[i] + "</option>";
            }

            $('#box').html(selectHTML);
            $('#box').val('Total.Population.of.Village');

            var attrList = $("#box").select2();
            //attrList.select2("open");

        });
    },

    createDistrictList: function() {
        // District List comes from config.js
        var selectHTML="";
        for( i = 0; i < districts.length; i++) {
            selectHTML+= "<option value='"+ districts[i] + "'>" + districts[i] + "</option>";
        }

        $('#district-list').html(selectHTML);
        $('#district-list').val('Ahmadnagar');
        $("#district-list").select2();
    },

    attachEvents: function() {
        var self = this;
        $('#district-list').on('change', function(val) {
            self.district_name = $("#district-list").val();
            self.districtMap.setDistrictName(self.district_name);
            if (self.isCustom) {
                //self.districtMap.loadCustomCSV(self.csv.data);


            } else {

                $("#download_csv").attr("href", "data/csvdata/census_split_by_district/" + geojson_file_map[self.district_name] + ".csv");
                $("#download_geojson").attr("href", "geometry/" + geojson_file_map[self.district_name] + '.geojson');
            }

        });

        $("#col-list").on('change', function(val) {
            self.districtMap.setFieldToMatch($("#col-list").val());
        });

        $("#box").change(function(val) {
            var val = $('#box').val();
            self.field_name = val;
            self.districtMap.setFieldName(val);
        });

        $("#snapshot").on("click", function(){

            html2canvas($("#map_container"), {
                onrendered: function(canvas) {
                    //var canvas = document.querySelector("canvas"),
                        context = canvas.getContext("2d");
                    //context.clearRect(0, 0, canvas.width, canvas.height);

                    var html = d3.select("svg")
                        .attr("version", 1.1)
                        .attr("xmlns", "http://www.w3.org/2000/svg")
                        .node().parentNode.innerHTML;

                    var imgsrc = 'data:image/svg+xml;base64,'+ btoa(html);
                    //var img = '<img src="'+imgsrc+'">';
                    //d3.select("#img_out").html(img);

                    theCanvas = canvas;
                    document.body.appendChild(canvas);
                    // Convert and download as image
                    //Canvas2Image.saveAsPNG(canvas);

                    $("#img-out").append(canvas);


                    var image = new Image;
                    image.src = imgsrc;
                    image.onload = function() {
                        context.drawImage(image, 0, 0);

                        var a = document.createElement("a");
                        //a.download = "fallback.png";
                        a.download = self.district_name + "_" + $("#box").val() + ".png";
                        a.href = canvas.toDataURL("image/png");
                        a.click();
                        // Clean up
                        context.clearRect(0, 0, canvas.width, canvas.height);
                        document.body.removeChild(canvas);
                    };
                }
            });
        });

        var file_input = document.getElementById('file_input');
        if(file_input.addEventListener) {

            file_input.addEventListener('change', function(e) {
                self.filename = document.getElementById("uploadFile").value = e.target.files[0].name;
                self.handleFile(e, self);
            });
        }


        $("input[name='data-input']").change(function(e){
            if($(this).val() == 'custom') {
                $("#custom-div").css({display:'block'});
                self.isCustom = true;
                self.districtMap.isCustom = true;
                if (self.csv !== undefined) {
                    self.districtMap.setFieldName(self.csv.meta.fields[1]);
                    self.districtMap.setFieldToMatch($("#col-list").val());
                }
                $("#download_csv").prop("disabled", true);
                //self.district_name = $("#district-list-custom").val();
                //$("#district-list").val(self.district_name).trigger('change');
                //self.districtMap.setDistrictName(self.district_name);


            } else {
                self.isCustom = false;
                self.districtMap.isCustom = false;
                self.createGroupedAttrList();
                self.districtMap.setFieldName('Total Population');
                self.districtMap.setFieldToMatch(fieldToMatch.csv);
                $("#custom-div").css({display:'none'});
                $("#download_csv").prop("disabled", false);
                //self.districtMap.create_map();
            }

        });
        //$('#myModal').on('hidden.bs.modal', function () {
        //
        //});
    },

    handleFile: function (e, self) {
        var file = e.target.files[0];
        if (file.type !== "text/csv") {
            alert("File type not supported. Please upload a csv file");
            return;
        }
        Papa.parse(file, {
            header: true,
            dynamicTyping: true,
            complete: function(results) {
                self.csv = results;
                self.districtMap.setCustomData(results.data);
                self.createFileColList(self.csv.meta.fields);
                self.createGroupedAttrList(self.csv.meta.fields);
                self.districtMap.setFieldName(self.csv.meta.fields[1]);

            }
        });

    }




}

