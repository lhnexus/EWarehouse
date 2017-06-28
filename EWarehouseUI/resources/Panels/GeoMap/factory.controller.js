sap.ui.define(['sap/m/MessageToast'],
	function(MessageToast) {
		"use strict";

		return sap.ui.controller("Panels.GeoMap.factory", {

			onInit: function() {

				var oModel = new sap.ui.model.json.JSONModel();

				oModel.loadData("Panels/mockserver/data.json");
				this.getView().setModel(oModel);

				this.oGeoMap = this.getView().byId("GeoMap");

				var oMapConfig = {
					"MapProvider": [{
						"name": "Openstreetmap",
						"tileX": "256",
						"tileY": "256",
						"maxLOD": "18",
						"Source": [{
							"id": "s1",
							// "url": "http://a.tile.openstreetmap.org/{LOD}/{X}/{Y}.png"
							//"url": "http://a.tile.openstreetmap.fr/hot/{LOD}/{X}/{Y}.png"
							//"url": "http://a.tile.stamen.com/toner/{LOD}/{X}/{Y}.png"
							"url": "http://a.tile2.opencyclemap.org/transport/{LOD}/{X}/{Y}.png"
								//"url": "http://a.basemaps.cartocdn.com/light_all/{LOD}/{X}/{Y}.png"

						}, {
							"id": "s2",
							//"url": "http://b.tile.openstreetmap.org/{LOD}/{X}/{Y}.png"
							//"url": "http://b.tile.openstreetmap.fr/hot/{LOD}/{X}/{Y}.png"
							//"url": "http://b.tile.stamen.com/toner/{LOD}/{X}/{Y}.png"
							"url": "http://b.tile2.opencyclemap.org/transport/{LOD}/{X}/{Y}.png"
								//"url": "http://b.basemaps.cartocdn.com/light_all/{LOD}/{X}/{Y}.png"
						}, {
							"id": "s3",
							//"url": "http://c.tile.openstreetmap.org/{LOD}/{X}/{Y}.png"
							//"url": "http://c.tile.openstreetmap.fr/hot/{LOD}/{X}/{Y}.png"
							//"url": "http://c.tile.stamen.com/toner/{LOD}/{X}/{Y}.png"
							"url": "http://c.tile2.opencyclemap.org/transport/{LOD}/{X}/{Y}.png"
								//"url": "http://c.basemaps.cartocdn.com/light_all/{LOD}/{X}/{Y}.png"
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

				// var startaddress = "foxconn+shenzhen";
				// var lat;
				// var lon;

				// $.ajax({
				// 	url: "http://nominatim.openstreetmap.org/search?format=json&limit=1&q=" + encodeURI(startaddress),
				// 	encoding: "UTF-8",
				// 	dataType: "json",
				// 	async: false,
				// 	success: function(json) {
				// 		lat = json[0].lat;
				// 		lon = json[0].lon;
				// 	}
				// });

				//this.oGeoMap.setInitialPosition(lon + ";" + lat + ";0");
				this.oGeoMap.setInitialPosition("114.04109;22.65375;0");
				this.oGeoMap.setVisualFrame({
					"minLon": 114.03829,
					"maxLon": 114.04337,
					"minLat": 22.65158,
					"maxLat": 22.65596,
					"minLOD": 18
				});
				
				this.oPage = this.getView().byId("factpage"); //Get Hold of page

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

			onAfterRendering: function() {
				var mPage = this.getView().byId("factpage"); //Get Hold of page
				mPage.scrollTo(0,0);
				MessageToast.show("After rendering.");
			},

			onClickAreas: function() {

				this.oPage.scrollTo(0, 0);
				// this.getView().byId("fixroot").scrollTo(0,0);
				MessageToast.show("The factory is pressed.");
			},
			
			onClickFA  : function() {
				this.getView().byId("GeoMap").getModel().refresh(true);
				MessageToast.show("FA is pressed.");
			},

			onClickmap: function() {

				this.oPage.scrollTo(0, 0);
				// this.getView().byId("fixroot").scrollTo(0,0);
				MessageToast.show("The GeoMap is pressed.");
			},
			// onMarkerClick: function(oEvent) {
			// 	this.oMap.setOptions({styles: this.ostyles["silver"]});
			// },

			press: function(oEvent) {
				MessageToast.show("The column micro chart is pressed.");
			}

		});
	});