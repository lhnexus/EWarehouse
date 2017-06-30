sap.ui.define(['sap/m/MessageToast'],
	function (MessageToast){
	"use strict";
 
 	return sap.ui.controller("Panels.MiniCharts.alert_notify", {
		onInit: function() {
			
			var oModel = new sap.ui.model.json.JSONModel();
           
        	// oModel.setData(data);
            oModel.loadData("Panels/mockserver/data.json",null,false);
            //this.getView().setModel(oModel);
            this.getView().setModel(oModel);

			var oAlertNum = this.getView().byId("alertNum");
			oAlertNum.bindProperty("value","/Alert/0/Value");
			oAlertNum.bindProperty("valueColor","/Alert/0/color");
			
				var oAlertIcon = this.getView().byId("alerticon");
				//oAlertIcon.bindProperty("src","Alert/0/Icon");
				oAlertIcon.setSrc("sap-icon://"+oModel.getData().Alert[0].Icon);
        		oAlertIcon.setColor(oModel.getData().Alert[0].Icolor);
		},
		press: function (oEvent) {
			MessageToast.show("The column micro chart is pressed.");
		}
		
		
 	});
});