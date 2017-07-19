sap.ui.define(["sap/ui/core/mvc/Controller", "sap/m/MessageToast", "../Util/svgUtil"],
	function (Controller,MessageToast){
	"use strict";
 
 	return Controller.extend("Canvas.Track.humidity", {
		onInit: function() {

            var oModel = new sap.ui.model.json.JSONModel();
            oModel.loadData("Canvas/mockserver/data.json");
            oModel.attachRequestCompleted(calRack);
            this.getView().setModel(oModel);


		},

        onAfterRendering: function(){

			var that = this;
            that._loadData(that);

        },


        _loadData: function(that){


            setInterval(function(){

                var num = Math.floor(Math.random()*10);
                var hnum = that.getView().byId("humiditynum");
                hnum.setValue(num);


            },1000);

        }
		
 	});
});