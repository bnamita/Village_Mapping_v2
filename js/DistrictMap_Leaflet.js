function DistrictMap_Leaflet() {};

DistrictMap_Leaflet.prototype = {
    setup: function(args) {
        // setup variables
        if (this.map) {
            this.map = null;
        }
        this.div_id = args.divId;
        this.district_name = args.district_name || 'Pune';
        this.field_name = args.field_name || 'Total.Population.of.Village'
        if (!this.map) {
            this.setup_map();
        }
        this.loading(true);
        this.create_map();
        this.searchControl;
    },


    setup_map: function() {
        var self = this;
        var map_id = {
            "light": "bnamita.lbkenk58",
            "dark": "bnamita.l282bpl6",
            "street_classic": "bnamita.lbkf97cf"
        };
        var map_color = map_id["light"];
        var osmLink = '<a href="http://openstreetmap.org">OpenStreetMap</a>';
        var mapboxUrl = 'https://{s}.tiles.mapbox.com/v3/{id}/{z}/{x}/{y}.png';
        var MBAttrib = '&copy; ' + osmLink + ' Contributors & <a href="https://www.mapbox.com/about/maps/">Mapbox</a>';
        var tileLayer = L.tileLayer(mapboxUrl, {id: map_color, attribution: MBAttrib});
        this.map = L.map('map_container', {
            center: [18.62, 74.2],
            zoom: 9,
            layers: [tileLayer]
        })
        this.choroLayer = new L.geoJson(null);
        this.info = L.control();

        this.legend = L.control({position: 'bottomright'});

        this.legend.onAdd = function (map) {

            var div = L.DomUtil.create('div', 'info legend'),
                labels = [];

            var grades = [0, 0.2, 0.4, 0.6, 0.8];
            // loop through our density intervals and generate a label with a colored square for each interval
            for (var i = 0; i < grades.length; i++) {
                div.innerHTML +=
                    '<i style="background:' + self.getLegendColor(grades[i]) + '"></i> ' +
                    grades[i] + (grades[i + 1] ? '&ndash;' + grades[i + 1] + '<br>' : '+');
            }

            return div;
        };

        this.legend.addTo(this.map);
    },

    updateLegend: function(max) {
        var grades = [0, 0.2, 0.4, 0.6, 0.8];
        var div = $('.legend')[0];
        div.innerHTML = '';
        // loop through our density intervals and generate a label with a colored square for each interval
        for (var i = 0; i < grades.length; i++) {
            div.innerHTML +=
                '<i style="background:' + this.getLegendColor(grades[i]) + '"></i> ' +
                Math.floor(grades[i]*max) + ((grades[i + 1]*max) ? '&ndash;' + Math.floor(grades[i + 1]*max) + '<br>' : '&ndash;' + Math.floor(max));
        }
    },

    getColor: function (data, min, max) {
        //min = Math.min.apply(Math,data[this.setFieldName].map(function(o){return parseFloat(o[column]);}));
        //max = Math.max.apply(Math,results3.map(function(o){return parseFloat(o[column]);}));
        var d, perc;
        if (data === undefined) {
            d = -1;
        } else {
            d = data[this.field_name]
        }

        if (d === -1) {
            perc = 0;
        } else if (d === 0) {
            perc = 0.2;
        } else {
            perc = 0.2 + 0.7*(d-min)/(max-min);
        }

        return perc > 0.8  ? '#bd0026' :
            perc > 0.6  ? '#f03b20' :
                perc > 0.4  ? '#fd8d3c' :
                    perc > 0.2  ? '#fecc5c' :
                        perc > 0    ? '#ffffb2' :
                            perc === -1 ? '#000' :
                                '#000'
    },

    getLegendColor: function(perc) {
        return perc >= 0.8  ? '#bd0026' :
            perc >= 0.6  ? '#f03b20' :
                perc >= 0.4  ? '#fd8d3c' :
                    perc >= 0.2  ? '#fecc5c' :
                        perc >= 0    ? '#ffffb2' :
                            //perc === -1 ? '#000' :
                                '#000'
    },

    create_map: function() {
        var self = this;

        if (self.info._map !== undefined) {
            self.info.remove();
        }
        self.info.onAdd = function (map) {
            this._div = L.DomUtil.create('div', 'info'); // create a div with a class "info"
            this.update();
            return this._div;
        };

        // method that we will use to update the control based on feature properties passed
        self.info.update = function (shapeLayerData, csvLayerData) {
            var csvVillageName;

            var dataVal = (csvLayerData && csvLayerData[self.field_name]) ? csvLayerData[self.field_name] : 'NA'
            this._div.innerHTML = '<h4>' + self.field_name + '  </h4>' +  (shapeLayerData ?
                '<b>' + shapeLayerData.VILLNAME + ' (' + shapeLayerData.VLGCD2011 + ') : </b><br />' + dataVal : '') ;
            if (csvLayerData && (shapeLayerData.VILLNAME !== csvLayerData['Village.Name'])) {
                this._div.innerHTML += '<br>' + ' Village name in csv: ' + csvLayerData['Village.Name'];

            }

        };

        self.info.addTo(self.map);


        function getDensityColor(data) {
            var d;
            if (data === undefined) {
                d = 0;
            } else {
                d = data[self.field_name]
            }

            return d > 1400 ? '#f03b20' :

                d > 1000  ? '#feb24c' :
                    d > 0  ? '#ffeda0' :
                        d === 0 ? '#000' :
                            '#000'

        }




        this.parseCSVFile().done(function(result) {
            var min = Math.min.apply(Math,result.map(function(o) { return parseFloat(o[self.field_name])})),
                max = Math.max.apply(Math,result.map(function(o) { return parseFloat(o[self.field_name])}));
            self.updateLegend(max);

             function getResult() {
                 return result;
             }

            function getFieldName() {
                return self.field_name;
            }
                function highlightFeature(e, csvLayerData) {
                    var layer = e.target;

                    layer.setStyle({
                        weight: 1,
                        color: '#666',
                        dashArray: '',
                        fillOpacity: 0.8
                    });

                    if (!L.Browser.ie && !L.Browser.opera) {
                        layer.bringToFront();
                    }
                    self.info.update(layer.feature.properties, csvLayerData);
                }

                function resetHighlight(e, csvLayerData) {
                    self.choroLayer.resetStyle(e.target);
                    self.info.update(e.target.feature.properties, csvLayerData);
                }

                function zoomToFeature(e, csvLayerData) {
                    self.map.fitBounds(e.target.getBounds());
                    self.info.update(e.target.feature.properties, csvLayerData);
                }

                self.choroLayer.clearLayers();
                self.choroLayer = L.geoJson(null, {
                    style: function (feature) {
                        self.featureData = getResult(),
                         fieldName = getFieldName(),
                            min = Math.min.apply(Math,self.featureData.map(function(o) { return parseFloat(o[fieldName])})),
                            max = Math.max.apply(Math,self.featureData.map(function(o) { return parseFloat(o[fieldName])}));

                        var csvLayerData = _.find(self.featureData, function(d) {
                            return d['Village.Code'] == feature.properties.VLGCD2011;
                        })
                        //if (csvLayerData === undefined) {
                        //    console.log(feature)
                        //}
                        return {
                            weight: 2,
                            opacity: 1,
                            color: 'white',
                            dashArray: '3',
                            fillOpacity: 0.7,
                            fillColor: self.getColor(csvLayerData, min, max )
                        };
                    },
                    onEachFeature: function (feature, layer) {
                        //layer.bindPopup('<h4>'+ feature.properties.VILLNAME +'</h4>');
                        //layer.on('mouseover', function (e) {
                        //    this.openPopup();
                        //});
                        //layer.on('mouseout', function (e) {
                        //    this.closePopup();
                        //});
                        var featureData = getResult();
                        var csvLayerData = _.find(featureData, function(d) {
                            return d['Village.Code'] == feature.properties.VLGCD2011;
                        })
                        layer.on({
                            mouseover: function(e) {
                                highlightFeature(e, csvLayerData);
                            },

                            mouseout: function(e) {
                                resetHighlight(e, csvLayerData);
                            },
                            click: function(e) {
                                zoomToFeature(e, csvLayerData)
                            }

                        });

                    }

                });


                $.ajax({
                    url: 'geometry/' + geojson_file_map[self.district_name] + '.geojson',
                    success: function (geojsonObj) {
                        self.choroLayer.addTo(self.map);
                        if (typeof geojsonObj === "string") {
                            geojsonObj = JSON.parse(geojsonObj);
                        }
                        self.choroLayer.addData(geojsonObj);
                        self.bestFitZoom();

                        if (self.searchControl === undefined) {
                            self.searchControl = new L.Control.Search({
                                //container: 'findbox',
                                textPlaceholder: 'Search Village...',
                                collapsed: false,
                                //position: 'topright',
                                layer: self.choroLayer,
                                propertyName: 'VILLNAME',
                                circleLocation: true,
                                moveToLocation: function(latlng, title, map) {
                                    //map.fitBounds( latlng.layer.getBounds() );
                                    var zoom = map.getBoundsZoom(latlng.layer.getBounds());
                                    map.setView(latlng, zoom - 3); // access the zoom
                                }
                            });
                            self.searchControl.on('search:locationfound', function(e) {

                                e.layer.setStyle({fillColor: 'blue', color: 'red'});
                                if(e.layer._popup)
                                    e.layer.openPopup();
                            }).on('search:collapsed', function(e) {
                                self.choroLayer.eachLayer(function(layer) {	//restore feature color
                                    self.choroLayer.resetStyle(layer);
                                });
                            });

                            self.map.addControl( self.searchControl );
                        } else {
                            self.searchControl._input.value = '';
                            self.searchControl._layer = self.choroLayer;
                            //$(self.searchControl._button).trigger('click')
                        }


                        self.loading(false);
                    },
                    error: function(e) {
                        console.log("File not available.")
                        alert("Data not available for " +self.district_name + ". Please select another district.");

                        self.loading(false);

                    }
                });

                 //inizialize search control

            //        self.map.on('layeradd', function(e) {
            //
            //    //console.log(e);
            //    //self.map.panTo(e.target.getPanes());
            //    //self.map.fitBounds(e.target.getBounds());
            //});

                });

    },

    parseCSVFile: function() {
        var self = this;
        var $deferred = new $.Deferred();
        var filepath = 'data/csvdata/census_split_by_district/' + geojson_file_map[self.district_name] +  '.csv';
        Papa.parse(filepath, {
            download: true,
            header: true,
            dynamicTyping: true,
            complete: function(response) {
                var results = response.data.filter( function(data){return parseFloat(data[self.field_name]) || data[self.field_name] === 0;} );
                $deferred.resolve(results);
            },
            error: function() {
                console.log("Error");
                alert("Data not available for " +self.district_name + ". Please select another district.");
                self.loading(false);
            }

        });
        return $deferred.promise();
    },

    updateStyle: function() {
        var self = this;
        this.choroLayer.eachLayer(function(layer) {

            var min = Math.min.apply(Math,self.featureData.map(function(o) { return parseFloat(o[self.field_name])})),
                max = Math.max.apply(Math,self.featureData.map(function(o) { return parseFloat(o[self.field_name])}));
            self.updateLegend(max);

            var csvLayerData = _.find(self.featureData, function(d) {
                return d['Village.Code'] == layer.feature.properties.VLGCD2011;
            })

            layer.setStyle({
                weight: 2,
                opacity: 1,
                color: 'white',
                dashArray: '3',
                fillOpacity: 0.7,
                fillColor: self.getColor(csvLayerData, min, max )
            });
        });
    },


    parseCSV: function(data, dataAttr) {
        // Split the lines
        var lines = data.split('\n');

        var joinByIndex = null, // Village.Code
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
                    if (item === 'Village.Code') {
                        joinByIndex = itemNo;
                    }
                    if (item === 'Village.Name') {
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
        //$(".overlay").show();
        //$("#loading-img").html('../images/5.gif');
        this.loading(true);
        var self = this;
        this.district_name = name;
        //this.create_map();
        this.choroLayer.clearLayers();
        //$.ajax({
        //    url: 'geometry/' + geojson_file_map[self.district_name] + '.geojson',
        //    success: function (geojsonObj) {
        //        self.choroLayer.addTo(self.map);
        //        self.choroLayer.addData(JSON.parse(geojsonObj))
        //        self.bestFitZoom();
        //        self.loading(false);
        //    }
        //});
        this.create_map();
    },

    setFieldName: function(name) {
        this.field_name = name;
        this.updateStyle();
        this.info.update();

        //this.loading(true);
        //this.create_map();
    },

    //setMapAttribute: function () {
    //    var self = this;
    //    //$.get('data/' + csv_file_map[self.field_name] + '.csv', function(csv) {
    //        //var parsedData = self.parseCSV(csv, self.field_name);
    //        //self.mapHandle.series[0].setData(parsedData)
    //        //self.mapHandle.series[0].name = self.field_name;
    //    //});
    //
    //    self.setFieldName('Outside the State/UT distance');
    //
    //},

    bestFitZoom: function ()
    {
        var self = this;
        // declaring the group variable
        var group = new L.featureGroup(null);

        // map._layers gives all the layers of the map including main container
        // so looping in all those layers filtering those having feature
        $.each(self.map._layers, function(ml){

            // here we can be more specific to feature for point, line etc.
            if(this._latlngs)
            {
                group.addLayer(this)
            }
        })

        self.map.fitBounds(group.getBounds());

        //var zoom = self.map.getBoundsZoom(latlng.layer.getBounds());
        //self.map.setView(latlng, zoom); // access the zoom
    },

    loading: function(visible) {
        if (visible) {
            $(".overlay").show();
            //$("#loading-img").html('<img src="./images/5.gif"/>');
        } else {
            $(".overlay").hide();
            //$("#loading-img").html('');
        }

    }



}

