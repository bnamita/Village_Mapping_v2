function VillageMapViz() {};

VillageMapViz.prototype = {
    setup: function(args) {
        // setup variables
        this.district_name = "Ahmadnagar";
        this.field_name = "Total.Population.of.Village";
        this.districtMap = new DistrictMap_Leaflet();

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

    createGroupedAttrList: function() {
        var self = this,
            csv_metadata = census_grouped_variables,
            selectHTML = "";

        for (var key in csv_metadata) {
            if (csv_metadata.hasOwnProperty(key)) {
                //console.log(key + " -> " + p[key]);
                selectHTML+= "<optgroup label='"+ key + "'>";
                for( var i = 0; i < csv_metadata[key].length; i++) {
                    selectHTML+= "<option value='"+ csv_metadata[key][i].name + "'>" + csv_metadata[key][i].name + "</option>";
                }
                selectHTML += "</optgroup>"
            }
            $('#box').html(selectHTML);
            $('#box').val('Total Population');

            var attrList = $("#box").select2();
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
            $("#download_csv").attr("href", "data/csvdata/census_split_by_district/" + geojson_file_map[self.district_name] + ".csv");
            $("#download_geojson").attr("href", "geometry/" + geojson_file_map[self.district_name] + '.geojson');
        });

        $("#box").change(function(val) {
            var val = $('#box').val();
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

    }
}

