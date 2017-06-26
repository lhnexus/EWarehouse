sap.ui.define(['sap/m/MessageToast'],
	function (MessageToast){
	"use strict";
 
 	return sap.ui.controller("Panels.MiniCharts.capacity_ut", {
		onInit: function() {
			
			var oModel = new sap.ui.model.json.JSONModel();
           
        	// oModel.setData(data);
            oModel.loadData("Panels/mockserver/data.json");
            //this.getView().setModel(oModel);
            this.getView().setModel(oModel);

			var oCapacityUtNum = this.getView().byId("capacityUtNum");
			oCapacityUtNum.bindProperty("value","/CapacityUtRate/Value");
			oCapacityUtNum.bindProperty("scale","/CapacityUtRate/scale");
			oCapacityUtNum.bindProperty("indicator","/CapacityUtRate/Indicator");
        	
		},
		press: function (oEvent) {
			MessageToast.show("The column micro chart is pressed.");
		}
		
		
 	});
});