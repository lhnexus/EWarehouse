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
		}
		
		
 	});
});