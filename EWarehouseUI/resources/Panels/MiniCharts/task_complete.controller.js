sap.ui.define([ "sap/ui/model/odata/v2/ODataModel", "sap/ui/core/util/MockServer" ],
	function(ODataModel, MockServer) {
	"use strict";
 
	return sap.ui.controller("Panels.MiniCharts.task_complete", {
		onInit: function() {
			// this._initMockServer();
 
			// var oTargetModel = new ODataModel("smartmicrochart.SmartBulletMicroChart/target", true);
			// this.getView().setModel(oTargetModel);
			var oModel = new sap.ui.model.json.JSONModel();
           // Load JSON in model
        	// oModel.setData(data);
            oModel.loadData("Panels/mockserver/data.json");
            //this.getView().setModel(oModel);
            this.getView().setModel(oModel);
            
        	var oTaskRateNum = this.getView().byId("taskRateNum");
			oTaskRateNum.bindProperty("value","/TaskRate/0/Value");
			oTaskRateNum.bindProperty("scale","/TaskRate/0/scale");
			
			var oTaskRateData = this.getView().byId("taskRateData");
			oTaskRateData.bindProperty("value","/TaskRate/0/Value");
			oTaskRateData.bindProperty("color","/TaskRate/0/color");
 
		}
	
	});
});