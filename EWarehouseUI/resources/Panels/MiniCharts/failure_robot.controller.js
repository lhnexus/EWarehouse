sap.ui.define(['sap/m/MessageToast'],
	function (MessageToast){
	"use strict";
 
 	return sap.ui.controller("Panels.MiniCharts.failure_robot", {
		onInit: function() {
			
			var oModel = new sap.ui.model.json.JSONModel();
           
        	// oModel.setData(data);
            oModel.loadData("Panels/mockserver/data.json");
            //this.getView().setModel(oModel);
            this.getView().setModel(oModel);

			var oFailRtNum = this.getView().byId("failRtNum");
			oFailRtNum.bindProperty("value","/FailureRate/0/Value");
			
			var oTotalNum = this.getView().byId("totalNum");
			oTotalNum.bindProperty("value","/FailureRate/0/Total");


			
        	
		},


        press: function (oEvent) {
			MessageToast.show("The column micro chart is pressed.");
		},

		onAfterRendering: function(){

            var oFailRtNum = this.getView().byId("failRtNum");
            var oTotalNum = this.getView().byId("totalNum");
            var oModel = this.getView().getModel();
            this._loadData(oFailRtNum,oTotalNum);

		},


        _loadData: function(oElement, oElement2){

			var max = oElement2.getValue();
			var min = oElement.getValue();

            setInterval(function(){

                var num = Math.floor(parseInt(min)+Math.random()*(parseInt(max)-parseInt(min)));

            	oElement.setValue(num);
            	},1000);

        }
		
		
 	});
});