function VillageMapViz() {};

VillageMapViz.prototype = {
    setup: function(args) {
        // setup variables
        this.map_type = args.map_type ? args.map_type : 'leaflet'
        this.district_name = "Ahmadnagar";
        this.field_name = "Total.Population.of.Village";

        if (this.map_type === 'leaflet') {
            $($('#map_container')[0]).addClass('map_container').removeClass('highchart_map_container');
            this.districtMap = new DistrictMap_Leaflet();

        } else {
            $($('#map_container')[0]).removeClass('map_container').addClass('highchart_map_container');
            this.districtMap = new DistrictMap_HighChart();
        }


        this.createMap();

        this.createAttrList();

        this.createDistrictList();

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
        d3.csv("./data/metadata/census_fields_meta.csv", function (csv_metadata) {

            var colArr = [],
                selectHTML = "";
            for (var i = 0; i < csv_metadata.length; i++) {
                if (csv_metadata[i]['column'].indexOf('(If not available within the village') === -1) {
                    colArr.push(csv_metadata[i]['column']);
                }
            }

            //var div = d3.select(".box")
            //div.selectAll('li')
            //    .data(colArr)
            //    .enter()
            //    .append("li")
            //    //.append("span")
            //    .attr("class", "attr")
            //    .html(function(d, i) {
            //        return '<span>' + colArr[i] + '</span>';
            //    })
            //$(".box").select2();

            for( i = 0; i < colArr.length; i++) {
                selectHTML+= "<option value='"+ colArr[i] + "'>" + colArr[i] + "</option>";
            }

            $('#box').html(selectHTML);
            $('#box').val('Total.Population.of.Village');
            //$("#box").select2();
            var attrList = $("#box").select2({
                closeOnSelect: false
            })
            //    .on("select2:closing", function(e) {
            //    e.preventDefault();
            //}).on("select2:closed", function(e) {
            //    attrList.select2("open");
            //})




            //    .on("select2:blur", function(e) {
            //    $.find('.select2-results__option--highlighted[aria-selected]').removeClass('.select2-results__option--highlighted[aria-selected]');
            //});
            attrList.select2("open");

        });
    },

    createDistrictList: function() {
        var districts = ['Pune', 'Satara','Kolhapur','Solapur','Sindhudurg','Thane','Latur','Hingoli','Aurangabad','Akola','Washim','Sangli','Dhule','Nandurbar','Jalgaon','Ahmadnagar','Bid','Buldana','Palghar','Raigad','Ratnagiri','Nashik','Jalna','Parbhani','Osmanabad','Nanded','Amravati','Bhandara','Chandrapur','Dhule','Gadchiroli','Gondiya','Mumbai_Sub','Nanded','Nagpur','Wardha','Yavatmal'];

        // District List
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
            //if (self.district_name.indexOf('Kolhapur') > -1) {
            //    self.district_name = '530_Kolhapur';
            //} else if (self.district_name.indexOf('Pune') > -1) {
            //    self.district_name = '521_Pune';
            //}
            //$("#map_container").html("loading...")
            //self.setDistrictName(self.district_name);
            //self.createMap();
            self.districtMap.setDistrictName(self.district_name);
        });


        $("#box").change(function(val) {
            var val = $('#box').val();
            self.districtMap.setFieldName(val);
        });
        


            //self.districtMap.setFieldName('Outside the State/UT distance');

    }
}

