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
        this.opacityVal = 0.7;
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

        /* --   FROM NIKHIL -- */
        /* set up the map*/
        var osmLink = '<a href="http://openstreetmap.org">OpenStreetMap</a>';
        var mapboxUrl = 'https://{s}.tiles.mapbox.com/v3/{id}/{z}/{x}/{y}.png';
        var MBAttrib = '&copy; ' + osmLink + ' Contributors & <a href="https://www.mapbox.com/about/maps/">Mapbox</a>';
        MBAttrib += '<br>Link to census data: ' + '<a href="http://www.censusindia.gov.in/2011census/dchb/DCHB.html">Click here</a>';

        var MBstreets = L.tileLayer(mapboxUrl, {id: 'nikhilsheth.m0mlpl2d', attribution: MBAttrib}),
            MBsatlabel = L.tileLayer(mapboxUrl, {id: 'nikhilsheth.m0mmaa87', attribution: MBAttrib}),
            MBsat = L.tileLayer(mapboxUrl, {id: 'nikhilsheth.m0mni8e7', attribution: MBAttrib}),
            MBemerald = L.tileLayer(mapboxUrl, {id: 'nikhilsheth.m0mmebk6', attribution: MBAttrib}),
            MBrun = L.tileLayer(mapboxUrl, {id: 'nikhilsheth.m0mmicn2', attribution: MBAttrib}),
            MBlight = L.tileLayer(mapboxUrl, {id: 'nikhilsheth.m0mmobne', attribution: MBAttrib}),
            MBbw = L.tileLayer(mapboxUrl, {id: 'nikhilsheth.m0mn13df', attribution: MBAttrib}),
            MBdark = L.tileLayer(mapboxUrl, {id: 'nikhilsheth.jme9hi44', attribution: MBAttrib}),
            MBpencil = L.tileLayer(mapboxUrl, {id: 'nikhilsheth.m0mn5lf5', attribution: MBAttrib}),
            MBpirates = L.tileLayer(mapboxUrl, {id: 'nikhilsheth.m0mn8b72', attribution: MBAttrib}),
            MBwheatpaste = L.tileLayer(mapboxUrl, {id: 'nikhilsheth.m0mnld61', attribution: MBAttrib}),
            MBcomic = L.tileLayer(mapboxUrl, {id: 'nikhilsheth.m0mo16hg', attribution: MBAttrib}),

            OsmIndia = L.tileLayer(mapboxUrl, {id: 'openstreetmap.1b68f018', attribution: MBAttrib});

        var baseLayers = {
            "OpenStreetMap.IN": OsmIndia,
            "Mapbox Streets": MBstreets,
            "Mapbox Satellite w/labels": MBsatlabel ,
            "Mapbox Light": MBlight ,
            "Mapbox Dark": MBdark
        };

        var overlays = {};


        /* -- END FROM NIKHIL -- */

        this.map = L.map('map_container', {
            center: [18.62, 74.2],
            zoom: 9,
            layers: [MBsatlabel]
        })

        var layerControl = L.control.layers(baseLayers, overlays, {collapsed: true}).addTo(this.map); //changed to selectLayers() so that layers panel doesn't get too big.
        $(layerControl.getContainer()).addClass('baselayer-control');


        // add the district boundary layer
        var MH_district_boundaries = L.geoJson(null, {
            style: {weight: 2, opacity: 1, color: '#636363', dashArray: '4', fillOpacity: 0 },
            onEachFeature: function(feature, layer) {

            } // end of onEachFeature
        }).addTo(self.map);

        omnivore.geojson('geometry/overlays/MH_district_boundaries.geojson', null, MH_district_boundaries);
        layerControl.addOverlay(MH_district_boundaries , "District Boundaries");

        this.choroLayer = new L.geoJson(null);
        this.info = L.control();
        this.legend = L.control({position: 'bottomright'});

        // add the legend
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
            div.innerHTML += '<i style="background:#000"></i> NA <br>';

            return div;
        };

        this.legend.addTo(this.map);
        $(this.legend.getContainer()).addClass('legend-control');

    },

    /*  updates legend on attribute change */
    updateLegend: function(max) {
        var grades =  (max <= 10) ? [0, 0.4, 0.8] : [0, 0.2, 0.4, 0.6, 0.8];
        var div = $('.legend')[0];
        div.innerHTML = '';
        if (max == -Infinity) {
            div.innerHTML += '<br> <i style="background:#000"></i> Data NA <br>';
            return;
        }
        if (categorical_variables.indexOf(this.field_name) !== -1) {
            // loop through our density intervals and generate a label with a colored square for each interval
            for (var i = 0; i < grades.length; i++) {
                if (Math.floor(grades[i]*max) !== Math.floor(grades[i + 1]*max)) {
                    div.innerHTML +=
                        '<i style="background:' + this.getLegendColor(grades[i], max) + '"></i> ' +
                        /*Math.round(grades[i]*max) + */ ((grades[i + 1]*max) ?  Math.floor(grades[i + 1]*max) + '<br>' : Math.floor(max));
                }

            }
            div.innerHTML += '<br> <i style="background:#000"></i> Data NA <br>';

        } else {
            // loop through our density intervals and generate a label with a colored square for each interval
            for (var i = 0; i < grades.length; i++) {
                if (Math.round(grades[i]*max) !== Math.round(grades[i + 1]*max)) {
                    div.innerHTML +=
                        '<i style="background:' + this.getLegendColor(grades[i], max) + '"></i> ' +
                        this.easynumber(grades[i]*max) + ((grades[i + 1]*max) ? '&ndash;' + this.easynumber(grades[i + 1]*max) + '<br>' : '&ndash;' + this.easynumber(max));
                }

            }
            div.innerHTML += '<br> <i style="background:#000"></i> NA <br>';
        }



    },


    easynumber: function (N) {
        F = parseFloat(N);
        if(F == 0)  return "0";
        else if (!F) return N;
        else if(F >= 10000000 ) return Math.round(100*F/10000000)/100 + " Cr";
        else if(F >= 100000 ) return Math.round(100*F/100000)/100 + " L";
        else if(F >= 1000 ) return Math.round(100*F/1000)/100 + " K";
        else if(F >= 1) return Math.round(100*F)/100;
    },

    /* returns color based on min/max values */
    getColor: function (data, min, max) {
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
            if ((max - min) > 0) {
                perc = 0.2 + 0.7*(d-min)/(max-min);
            } else if ((max - min) === 0) {
                perc = 1;
            }

        }

        if (max  <= 10) {
            return perc > 0.8  ? '#f03b20' :
                perc > 0.4  ? '#feb24c' :
                    perc > 0.1  ? '#ffeda0' :
                                perc === -1 ? '#000' :
                                    '#000'
        }

        return perc > 0.8  ? '#bd0026' :
            perc > 0.6  ? '#f03b20' :
                perc > 0.4  ? '#fd8d3c' :
                    perc > 0.2  ? '#fecc5c' :
                        perc > 0    ? '#ffffb2' :
                            perc === -1 ? '#000' :
                                '#000'
    },

    /* returns colors for legend */
    getLegendColor: function(perc, max) {

        if (max  <= 10) {
            return perc >= 0.8  ? '#f03b20' :
                perc > 0.4  ? '#feb24c' :
                    perc > 0.1  ? '#ffeda0' :
                        perc === -1 ? '#000' :
                            '#000'
        }

        return perc >= 0.8  ? '#bd0026' :
            perc >= 0.6  ? '#f03b20' :
                perc >= 0.4  ? '#fd8d3c' :
                    perc >= 0.2  ? '#fecc5c' :
                        perc >= 0    ? '#ffffb2' :
                            //perc === -1 ? '#000' :
                                '#000'
    },

    /* main leaflet map function */
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
            if (csvLayerData === null) {
                this._div.innerHTML = '<h4>' + self.field_name + '  </h4>';
                return;
            }
            var dataVal = (csvLayerData && csvLayerData[self.field_name] !== undefined) ? csvLayerData[self.field_name] : 'NA'
            this._div.innerHTML = '<h4>' + self.field_name + '  </h4>' +  (shapeLayerData ?
                '<b>' + shapeLayerData.VILLNAME + ' (' + shapeLayerData[fieldToMatch['geometry']] + '), ' + shapeLayerData['IPNAME']  +  ': </b><br />' + dataVal : '') ;
            if (csvLayerData && (shapeLayerData.VILLNAME !== csvLayerData['Village.Name'])) {
                this._div.innerHTML += '<br>' + ' Village name in csv: ' + csvLayerData['Village.Name'];

            }

        };

        self.info.addTo(self.map);
        $(self.info.getContainer()).addClass('info-control');

        if (!this.opacitySlider) {
            //Create the opacity controls
            this.opacitySlider = new L.Control.opacitySlider({position: 'topright'});
            this.map.addControl(this.opacitySlider);
            $('.opacity_slider_control').on('slide', function(e, ui) {
                self.setOpacity(ui.value/100);
            });
        }

        // parse the csv file, then create geojson layer
        this.parseCSVFile().done(function(result) {
            var min = Math.min.apply(Math,result.map(function(o) {
                    if (!isNaN(o[self.field_name]) && o[self.field_name] >= 0) {
                        return parseFloat(o[self.field_name])
                    }
                }).filter(function( element ) {
                    return element !== undefined;
                })),
                max = Math.max.apply(Math,result.map(function(o) {
                    if (!isNaN(o[self.field_name]) && o[self.field_name] >= 0) {
                        return parseFloat(o[self.field_name])
                    }
                }).filter(function( element ) {
                    return element !== undefined;
                }));
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
                        fillOpacity: self.opacityVal,
                        fillColor: self.getColor(csvLayerData, min, max )
                    });

                    if (!L.Browser.ie && !L.Browser.opera) {
                        layer.bringToFront();
                    }
                    self.info.update(layer.feature.properties, csvLayerData);
                }

                function resetHighlight(e, csvLayerData) {
                    self.choroLayer.resetStyle(e.target);
                    self.info.update(e.target.feature.properties, null);
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
                            min = Math.min.apply(Math,self.featureData.map(function(o) {
                                if (!isNaN(o[fieldName]) && o[fieldName] >= 0) {
                                    return parseFloat(o[fieldName])
                                }
                            }).filter(function( element ) {
                                return element !== undefined;
                            })),
                            max = Math.max.apply(Math,self.featureData.map(function(o) {
                                    if (!isNaN(o[fieldName]) && o[fieldName] >= 0) {
                                        return parseFloat(o[fieldName])
                                    }
                            }).filter(function( element ) {
                                return element !== undefined;
                            }));

                        var csvLayerData = _.find(self.featureData, function(d) {
                            return d[fieldToMatch['csv']] == feature.properties[fieldToMatch['geometry']];
                        })
                        return {
                            weight: 2,
                            opacity: self.opacityVal,
                            color: 'white',
                            dashArray: '3',
                            fillOpacity: self.opacityVal,
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
                            return d[fieldToMatch['csv']] == feature.properties[fieldToMatch['geometry']];
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
                                textPlaceholder: 'Locate Village...',
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
                            $(".leaflet-control-search").attr("data-html2canvas-ignore",true);
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
        });

    },

    /* parse CSV file when on district change */
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

    /* update layers when on attribute change */
    updateStyle: function() {
        var self = this;
        var $deferred = new $.Deferred();
        var min = Math.min.apply(Math,self.featureData.map(function(o) {
            if (o[self.field_name] !== undefined &&  self.field_name !== undefined && !isNaN(o[self.field_name]) && o[self.field_name] >= 0) {
                return parseFloat(o[self.field_name])
            }
        }).filter(function( element ) {
            return element !== undefined;
        })),
        max = Math.max.apply(Math,self.featureData.map(function(o) {
            if (o[self.field_name] !== undefined && !isNaN(o[self.field_name]) && o[self.field_name] >= 0) {
                return parseFloat(o[self.field_name])
            }
        }).filter(function( element ) {
            return element !== undefined;
        }));
        this.choroLayer.eachLayer(function(layer) {


            self.updateLegend(max);

            var csvLayerData = _.find(self.featureData, function(d) {
                return d[fieldToMatch['csv']] == layer.feature.properties[fieldToMatch['geometry']];
            })

            layer.setStyle({
                weight: 2,
                opacity: self.opacityVal,
                color: 'white',
                dashArray: '3',
                fillOpacity: self.opacityVal,
                fillColor: self.getColor(csvLayerData, min, max )
            });
        });
        $deferred.resolve();
        return $deferred.promise();

    },

    /* setter for district name */
    setDistrictName: function(name) {
        this.loading(true);
        var self = this;
        this.district_name = name;
        this.choroLayer.clearLayers();

        this.create_map();
    },

    /* setter for field name */
    setFieldName: function(name) {
        var self = this;
        $(".info")[0].textContent = "Loading...";
        this.loading(true);
        this.field_name = fields_short_long_map[name];
        this.updateStyle().done(function(){
            self.loading(false);
            self.info.update();
        });
    },


    /* pan to new district */
    bestFitZoom: function ()
    {
        var self = this;
        // declaring the group variable
        var group = new L.featureGroup(null);

        // map._layers gives all the layers of the map including main container
        // so looping in all those layers filtering those having feature
        $.each(self.choroLayer._layers, function(ml){
            if(this._latlngs)
            {
                group.addLayer(this)
            }
        })

        self.map.fitBounds(group.getBounds());
    },

    /* show loading overlay while waiting for response */
    loading: function(visible) {
        if (visible) {
            $(".overlay").show();
        } else {
            $(".overlay").hide();
        }

    },

    /* set layer opacity */
    setOpacity: function(val) {
        this.choroLayer.eachLayer(function(layer) {
            layer.setStyle({
                fillOpacity: val,
                //opacity: val
            })
        });
        this.opacityVal = val;
    }
}

