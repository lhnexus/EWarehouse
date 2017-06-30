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
							//"url": "http://1.base.maps.cit.api.here.com/maptile/2.1/maptile/newest/normal.day/{z}/{x}/{y}/256/png8?app_id=DemoAppId01082013GAL&app_code=AJKnXv84fjrb0KIHawS0Tg"
							//"url": "https://online1.map.bdimg.com/onlinelabel/?qt=tile&x={X}&y={Y}&z={LOD}"
							//"url": "https://p1.map.gtimg.com/maptilesv2/{LOD}/{X/16}/{Y/16}/{X}_{Y}.png"
							"url": "https://a.tile.openstreetmap.org/{LOD}/{X}/{Y}.png"
								//"url": "http://a.tile.openstreetmap.fr/hot/{LOD}/{X}/{Y}.png"
								//"url": "http://a.tile.stamen.com/toner/{LOD}/{X}/{Y}.png"
								//"url": "http://a.tile2.opencyclemap.org/transport/{LOD}/{X}/{Y}.png"
								//"url": "http://a.basemaps.cartocdn.com/light_all/{LOD}/{X}/{Y}.png"

						}, {
							"id": "s2",
							//"url": "http://2.base.maps.cit.api.here.com/maptile/2.1/maptile/newest/normal.day/{z}/{x}/{y}/256/png8?app_id=DemoAppId01082013GAL&app_code=AJKnXv84fjrb0KIHawS0Tg"
							//"url": "https://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}"
							//"url": "https://online2.map.bdimg.com/onlinelabel/?qt=tile&x={X}&y={Y}&z={LOD}"
							//"url": "https://p2.map.gtimg.com/maptilesv2/{LOD}/{X/16}/{Y/16}/{X}_{Y}.png"
							"url": "https://b.tile.openstreetmap.org/{LOD}/{X}/{Y}.png"
								//"url": "http://b.tile.openstreetmap.fr/hot/{LOD}/{X}/{Y}.png"
								//"url": "http://b.tile.stamen.com/toner/{LOD}/{X}/{Y}.png"
								//"url": "http://b.tile2.opencyclemap.org/transport/{LOD}/{X}/{Y}.png"
								//"url": "http://b.basemaps.cartocdn.com/light_all/{LOD}/{X}/{Y}.png"
						}, {
							"id": "s3",
							//"url": "http://3.base.maps.cit.api.here.com/maptile/2.1/maptile/newest/normal.day/{z}/{x}/{y}/256/png8?app_id=DemoAppId01082013GAL&app_code=AJKnXv84fjrb0KIHawS0Tg"
							//"url": "https://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}"
							//"url": "https://online3.map.bdimg.com/onlinelabel/?qt=tile&x={X}&y={Y}&z={LOD}"
							//"url": "https://p3.map.gtimg.com/maptilesv2/{LOD}/{X/16}/{Y/16}/{X}_{Y}.png"
							"url": "https://c.tile.openstreetmap.org/{LOD}/{X}/{Y}.png"
								//"url": "http://c.tile.openstreetmap.fr/hot/{LOD}/{X}/{Y}.png"
								//"url": "http://c.tile.stamen.com/toner/{LOD}/{X}/{Y}.png"
								//"url": "http://c.tile2.opencyclemap.org/transport/{LOD}/{X}/{Y}.png"
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
				// this.oGeoMap.setVisualFrame({
				// 	"minLon": 114.03829,
				// 	"maxLon": 114.04337,
				// 	"minLat": 22.65158,
				// 	"maxLat": 22.65596,
				// 	"minLOD": 18
				// });
				this.oGeoMap.setDisablePan(true);

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
				mPage.scrollTo(0, 0);
				//MessageToast.show("After rendering.");
			},

			onClickArea: function(oEvent) {

				this.oPage.scrollTo(0, 0);

				this.changeAllChartsByWarehouse(oEvent.getSource().getTooltip());
				//MessageToast.show(oEvent.getSource().getTooltip());
			},

			onClickFA: function() {
				//update chart values
				this.changeAllChartsByFactory("0");

				//update map location
				this.oGeoMap.setInitialPosition("114.04109;22.65375;0");
				this.oGeoMap.setInitialZoom(18);
				// sap.ui.getCore().byId("factpage").getModel().refresh(true);
				// MessageToast.show("FA is pressed.");
			},
			onClickFB: function() {
				//update chart values
				this.changeAllChartsByFactory("1");

				//update map location
				this.oGeoMap.setInitialPosition("113.8457;34.5533;0");
				this.oGeoMap.setInitialZoom(15);
				// MessageToast.show("FA is pressed.");
			},

			onClickFC: function() {
				//update chart values
				this.changeAllChartsByFactory("2");

				//update map location
				this.oGeoMap.setInitialPosition("114.1073;23.1415;0");
				this.oGeoMap.setInitialZoom(16);
				//MessageToast.show("The GeoMap is pressed.");
			},

			onClickFD: function() {
				//update chart values
				this.changeAllChartsByFactory("3");

				//update map location
				this.oGeoMap.setInitialPosition("112.5844;37.7467;0");
				this.oGeoMap.setInitialZoom(16);
				//MessageToast.show("The GeoMap is pressed.");
			},
			// onMarkerClick: function(oEvent) {
			// 	this.oMap.setOptions({styles: this.ostyles["silver"]});
			// },

			changeAllChartsByFactory: function(fnum) {
				this.changeTaskCompletion(fnum);
				this.changeOnTimeDeliver(fnum);
				this.changeFailRobot(fnum);
				this.changeAlertNotify(fnum);
			},

			formatWarehouse: function(wtooltip) {
				var wnum;
				var fnum;
				switch (wtooltip) {
					case "shenzhen warehouse A":
						fnum = 0;
						wnum = 0;
						break;
					case "shenzhen warehouse B":
						fnum = 0;
						wnum = 1;
						break;
					case "shenzhen warehouse C":
						fnum = 0;
						wnum = 2;
						break;
					case "shenzhen warehouse D":
						fnum = 0;
						wnum = 3;
						break;
					case "zhengzhou warehouse A":
						fnum = 1;
						wnum = 0;
						break;
					case "zhengzhou warehouse B":
						fnum = 1;
						wnum = 1;
						break;
					case "zhengzhou warehouse C":
						fnum = 1;
						wnum = 2;
						break;
					case "huizhou warehouse A":
						fnum = 2;
						wnum = 0;
						break;
					case "huizhou warehouse B":
						fnum = 2;
						wnum = 1;
						break;
					case "taiyuan warehouse A":
						fnum = 3;
						wnum = 0;
						break;
					case "taiyuan warehouse B":
						fnum = 3;
						wnum = 1;
						break;
					case "taiyuan warehouse C":
						fnum = 3;
						wnum = 2;
						break;
					case "taiyuan warehouse D":
						fnum = 3;
						wnum = 3;
						break;
					default:
						fnum = -1;
						wnum = -1;
				}

				return [fnum, wnum];
			},

			changeAllChartsByWarehouse: function(wtooltip) {

				this.changeTaskCompletion(this.formatWarehouse(wtooltip)[0], this.formatWarehouse(wtooltip)[1]);
				this.changeOnTimeDeliver(this.formatWarehouse(wtooltip)[0], this.formatWarehouse(wtooltip)[1]);
				this.changeFailRobot(this.formatWarehouse(wtooltip)[0], this.formatWarehouse(wtooltip)[1]);
				this.changeAlertNotify(this.formatWarehouse(wtooltip)[0], this.formatWarehouse(wtooltip)[1]);
			},

			changeTaskCompletion: function(fnum, wnum) {
				var taskRateNum = sap.ui.getCore().byId("Panels_Charts--task_complete--taskRateNum");
				var gConfigModel = this.getView().getModel();
				var taskRateData = sap.ui.getCore().byId("Panels_Charts--task_complete--targetSmartChart");
				var oActual = new sap.suite.ui.microchart.BulletMicroChartData();
				if (wnum >= 0) {
					taskRateNum.setValue(gConfigModel.getData().TaskRate[fnum].factorys[wnum].Value);
					oActual.setValue(parseFloat(gConfigModel.getData().TaskRate[fnum].factorys[wnum].Value));
					oActual.setColor(gConfigModel.getData().TaskRate[fnum].factorys[wnum].color);
					taskRateData.setActual(oActual);
				} else {
					taskRateNum.setValue(gConfigModel.getData().TaskRate[fnum].Value);
					oActual.setValue(parseFloat(gConfigModel.getData().TaskRate[fnum].Value));
					oActual.setColor(gConfigModel.getData().TaskRate[fnum].color);
					taskRateData.setActual(oActual);
				}

			},

			changeOnTimeDeliver: function(fnum, wnum) {

				var oOnTimeDelNum = sap.ui.getCore().byId("Panels_Charts--ontime_delivery--onTimeDelNum");
				var gConfigModel = this.getView().getModel();

				var oOnTimeChart = sap.ui.getCore().byId("Panels_Charts--ontime_delivery--ontimeChart");
				var length = gConfigModel.getData().OnTimeDelRate[fnum].Vperday.length;

				oOnTimeChart.destroyColumns();

				if (wnum >= 0) {
					oOnTimeDelNum.setValue(gConfigModel.getData().OnTimeDelRate[fnum].factorys[wnum].Value);
					oOnTimeDelNum.setIndicator(eval("sap.m.DeviationIndicator." + gConfigModel.getData().OnTimeDelRate[fnum].factorys[wnum].Indicator));

					for (var i = 0; i < length; i++) {
						var oCol = new sap.suite.ui.microchart.ColumnMicroChartData();
						oCol.setValue(parseFloat(gConfigModel.getData().OnTimeDelRate[fnum].factorys[wnum].Vperday[i].colvalue));
						oCol.setColor(eval("sap.m.ValueColor." + gConfigModel.getData().OnTimeDelRate[fnum].factorys[wnum].Vperday[i].ValueColor));
						oOnTimeChart.addColumn(oCol);
					}

				} else {
					oOnTimeDelNum.setValue(gConfigModel.getData().OnTimeDelRate[fnum].Value);
					oOnTimeDelNum.setIndicator(eval("sap.m.DeviationIndicator." + gConfigModel.getData().OnTimeDelRate[fnum].Indicator));

					for (var i = 0; i < length; i++) {
						var oCol = new sap.suite.ui.microchart.ColumnMicroChartData();
						oCol.setValue(parseFloat(gConfigModel.getData().OnTimeDelRate[fnum].Vperday[i].colvalue));
						oCol.setColor(eval("sap.m.ValueColor." + gConfigModel.getData().OnTimeDelRate[fnum].Vperday[i].ValueColor));
						oOnTimeChart.addColumn(oCol);
					}
				}

			},

			changeFailRobot: function(fnum, wnum) {

				var oFailRtNum = sap.ui.getCore().byId("Panels_Charts--fail_rate--failRtNum");
				var gConfigModel = this.getView().getModel();
				var oTotalNum = sap.ui.getCore().byId("Panels_Charts--fail_rate--totalNum");

				if (wnum >= 0) {
					oFailRtNum.setValue(gConfigModel.getData().FailureRate[fnum].factorys[wnum].Value);
					oTotalNum.setValue(gConfigModel.getData().FailureRate[fnum].factorys[wnum].Total);
				} else {
					oFailRtNum.setValue(gConfigModel.getData().FailureRate[fnum].Value);
					oTotalNum.setValue(gConfigModel.getData().FailureRate[fnum].Total);
				}

			},

			changeAlertNotify: function(fnum, wnum) {
				var oAlertNum = sap.ui.getCore().byId("Panels_Charts--alert_notification--alertNum");
				var gConfigModel = this.getView().getModel();
				var oAlertIcon = sap.ui.getCore().byId("Panels_Charts--alert_notification--alerticon");

				if (wnum >= 0) {
					oAlertNum.setValue(gConfigModel.getData().Alert[fnum].factorys[wnum].Value);
					oAlertNum.setValueColor(gConfigModel.getData().Alert[fnum].factorys[wnum].color);

					oAlertIcon.setSrc("sap-icon://" + gConfigModel.getData().Alert[fnum].factorys[wnum].Icon);
					oAlertIcon.setColor(gConfigModel.getData().Alert[fnum].factorys[wnum].Icolor);
				} else {

					oAlertNum.setValue(gConfigModel.getData().Alert[fnum].Value);
					oAlertNum.setValueColor(gConfigModel.getData().Alert[fnum].color);

					oAlertIcon.setSrc("sap-icon://" + gConfigModel.getData().Alert[fnum].Icon);
					oAlertIcon.setColor(gConfigModel.getData().Alert[fnum].Icolor);
				}

			},

			press: function(oEvent) {
				MessageToast.show("The column micro chart is pressed.");
			}

		});
	});