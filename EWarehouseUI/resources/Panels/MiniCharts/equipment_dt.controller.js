sap.ui.define(['sap/m/MessageToast'],
	function (MessageToast){
	"use strict";
 
 	return sap.ui.controller("Panels.MiniCharts.equipment_dt", {
		onInit: function() {
			
			var oModel = new sap.ui.model.json.JSONModel();
           
        	// oModel.setData(data);
            oModel.loadData("Panels/mockserver/data.json");
            //this.getView().setModel(oModel);
            this.getView().setModel(oModel);

			var oCapacityUtNum = this.getView().byId("equipmentDtNum");
			oCapacityUtNum.bindProperty("value","/EquipmentDtRate/Value");
			oCapacityUtNum.bindProperty("scale","/EquipmentDtRate/scale");
			oCapacityUtNum.bindProperty("indicator","/EquipmentDtRate/Indicator");
        	
		},
		press: function (oEvent) {
			MessageToast.show("The column micro chart is pressed.");
		}
		
		
 	});
});