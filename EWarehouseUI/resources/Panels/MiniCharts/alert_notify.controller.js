sap.ui.define(['sap/m/MessageToast'],
	function (MessageToast){
	"use strict";
 
 	return sap.ui.controller("Panels.MiniCharts.alert_notify", {
		onInit: function() {
			
			var oModel = new sap.ui.model.json.JSONModel();
           
        	// oModel.setData(data);
            oModel.loadData("Panels/mockserver/data.json");
            //this.getView().setModel(oModel);
            this.getView().setModel(oModel);

			var oAlertNum = this.getView().byId("alertNum");
			oAlertNum.bindProperty("value","/Alert/Value");
			oAlertNum.bindProperty("valueColor","/Alert/color");
        	
		},
		press: function (oEvent) {
			MessageToast.show("The column micro chart is pressed.");
		}
		
		
 	});
});