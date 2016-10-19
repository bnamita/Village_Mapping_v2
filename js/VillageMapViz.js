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
        this.createAttrList();

        // populate district list
        this.createDistrictList();

        // attach change events for district and attribute
        this.attachEvents();


    },

    createMap: function () {
        this.districtMap.setup({
            divId: 'map_container',
            district_name: this.district_name,
            field_name: this.field_name
        });
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
            attrList.select2("open");

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
        });

        $("#box").change(function(val) {
            var val = $('#box').val();
            self.districtMap.setFieldName(val);
        });
    }
}

