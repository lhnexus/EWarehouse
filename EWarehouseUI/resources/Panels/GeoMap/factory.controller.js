sap.ui.define(['sap/m/MessageToast'],
	function(MessageToast) {
		"use strict";

		return sap.ui.controller("Panels.GeoMap.factory", {
			onInit: function() {

				this.oGeoMap = this.getView().byId("GeoMap");

				var oMapConfig = {
					"MapProvider": [{
						"name": "Openstreetmap",
						"tileX": "256",
						"tileY": "256",
						"maxLOD": "20",
						"Source": [{
							"id": "s1",
							"url": "http://a.tile.openstreetmap.org/{LOD}/{X}/{Y}.png"
						}, {
							"id": "s2",
							"url": "http://b.tile.openstreetmap.org/{LOD}/{X}/{Y}.png"
						}, {
							"id": "s3",
							"url": "http://c.tile.openstreetmap.org/{LOD}/{X}/{Y}.png"
						}]
					}],
					"MapLayerStacks": [{
						"name": "DEFAULT",
						"MapLayer": {
							"name": "layer1",
							"refMapProvider": "Openstreetmap",
							"opacity": "1.0",
							"colBkgnd": "RGB(255,255,255)"
						}
					}]
				};

				this.oGeoMap.setMapConfiguration(oMapConfig);
				this.oGeoMap.setRefMapLayerStack("DEFAULT");
				this.oGeoMap.setInitialZoom(18);
				
				var startaddress = "foxconn+shenzhen";
				var lat;
				var lon;

				$.ajax({
					url: "http://nominatim.openstreetmap.org/search?format=json&limit=1&q=" + encodeURI(startaddress),
					encoding: "UTF-8",
					dataType: "json",
					async: false,
					success: function(json) {
						lat = json[0].lat;
						lon = json[0].lon;
					}
				});
			
				this.oGeoMap.setInitialPosition(lon + ";" + lat + ";0");
				//this.oGeoMap.setInitialPosition("22.651694;114.044770;0");

				////////////////////HBOX Codes

				// this.oMap = new google.maps.Map(this.byId("factoryMap"), {
				// 	center: {
				// 		lat: -33.86,
				// 		lng: 151.209
				// 	},
				// 	zoom: 13,
				// 	mapTypeControl: false
				// });
				//this.oMap = this.byId("factoryMap");
				// this.oMap.setOptions({styles: styles["silver"]});

			},

			onAferRendering: function() {

			},

			// onMarkerClick: function(oEvent) {
			// 	this.oMap.setOptions({styles: this.ostyles["silver"]});
			// },

			press: function(oEvent) {
				MessageToast.show("The column micro chart is pressed.");
			}

		});
	});