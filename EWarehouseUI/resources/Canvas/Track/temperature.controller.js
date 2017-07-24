sap.ui.define(["sap/ui/core/mvc/Controller", "sap/m/MessageToast", "../Util/svgUtil"],
	function (Controller,MessageToast){
	"use strict";
 
 	return Controller.extend("Canvas.Track.temperature", {
		onInit: function() {

            var oModel = new sap.ui.model.json.JSONModel();
            oModel.loadData("Canvas/mockserver/data.json");

            var oModel = new sap.ui.model.odata.v2.ODataModel("https://iotmmsi323921trial.hanatrial.ondemand.com/com.sap.iotservices.mms/v1/api/http/app.svc");

            oModel.attachMetadataLoaded(null, function(){
                var oMetadata = oModel.getServiceMetadata();
                console.log(oMetadata);
            },null);


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
                var hnum = that.getView().byId("temperaturenum");
                hnum.setValue(num);


            },1000);

        }
		
 	});
});