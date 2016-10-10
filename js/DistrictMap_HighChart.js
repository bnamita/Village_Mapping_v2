function DistrictMap_HighChart() {};

DistrictMap_HighChart.prototype = {
    setup: function(args) {
        // setup variables
        this.div_id = args.divId;
        this.district_name = args.district_name || 'Pune';
        this.field_name = args.field_name || 'Total.Population.of.Village'
        this.create_map();
    },

    create_map: function() {
        var self = this;
        $.get('data/mh_census_26.csv', function(csv) {

            var parsedData = self.parseCSV(csv, self.field_name);
            $.getJSON('geometry/' + self.district_name + '.geojson', function (geojson) {
                // Initiate the chart

                //self.mapHandle = $('#' + self.div_id).highcharts('Map', {
                var options = {
                    title: {
                        text: ''
                    },

                    mapNavigation: {
                        enabled: true,
                        buttonOptions: {
                            verticalAlign: 'bottom'
                        }
                    },
                    colorAxis: {},

                    //colorAxis: {
                    //    min: 0,
                    //    type: 'logarithmic',
                    //    minColor: '#EEEEFF',
                    //    maxColor: '#000022',
                    //    stops: [
                    //        [0, '#EFEFFF'],
                    //        [0.67, '#4444FF'],
                    //        [1, '#000022']
                    //    ]
                    //},
                    series: [{
                        data: parsedData,
                        mapData: geojson,
                        joinBy: ['VLGCD2011', 'code'],
                        name: self.field_name,
                        states: {
                            hover: {
                                color: '#BADA55'
                            }
                        },
                        tooltip: {
                            //pointFormat: '{point.properties.VILLNAME}:<b>{point.value:.0f}'
                            pointFormat: '{point.options.name}:<b>{point.value:.0f}'
                        }
                        //,
                        //dataLabels: {
                        //    enabled: true,
                        //    format: '{point.code}'
                        //}
                    }]
                }
                self.mapHandle = new Highcharts.Map(self.div_id, options);
            });

        });
    },

    parseCSV: function(data, dataAttr) {
        // Split the lines
        var lines = data.split('\n');

        var joinByIndex = null, // Village Code
            dataAttrIndex =null, // Geographical Area
            joinNameIndex = null;
        data = []
        // Iterate over the lines and add categories or series
        $.each(lines, function(lineNo, line) {
            var items = line.split(',');

            // header line containes categories
            if (lineNo == 0) {
                $.each(items, function (itemNo, item) {
                    //if (itemNo > 0) options.xAxis.categories.push(item);
                    if (item === dataAttr) {
                        dataAttrIndex = itemNo;
                    }
                    if (item === 'Village Code') {
                        joinByIndex = itemNo;
                    }
                    if (item === 'Village Name') {
                        joinNameIndex = itemNo;
                    }

                });
            }

            // the rest of the lines contain data with their name in the first
            // position
            else {
                data.push({
                    "code" : items[joinByIndex],
                    "name" : items[joinNameIndex],
                    "value" : Number(items[dataAttrIndex])


                })
            }
        });
        return data;
    },

    setDistrictName: function(name) {
        this.district_name = name;

    },

    setFieldName: function(name) {
        this.field_name = name;
    },

    setMapAttribute: function () {
        var self = this;
        $.get('data/mh_census_24.csv', function(csv) {
            var parsedData = self.parseCSV(csv, 'Outside the State/UT distance');
            self.mapHandle.series[0].setData(parsedData)
            self.mapHandle.series[0].name = self.field_name;
        });

        self.setFieldName('Outside the State/UT distance');

    }



}

