sap.ui.define(['sap/m/MessageToast'],
	function (MessageToast){
	"use strict";
 
 	return sap.ui.controller("Panels.MiniCharts.ontime_delivery", {
		onInit: function() {
			
			var oModel = new sap.ui.model.json.JSONModel();
           // Load JSON in model
        	// oModel.setData(data);
            oModel.loadData("Panels/mockserver/data.json",null,false);
            //this.getView().setModel(oModel);
            this.getView().setModel(oModel);

			var oOnTimeDelNum = this.getView().byId("onTimeDelNum");
			oOnTimeDelNum.bindProperty("value","/OnTimeDelRate/Value");
			oOnTimeDelNum.bindProperty("scale","/OnTimeDelRate/scale");
			oOnTimeDelNum.bindProperty("indicator","/OnTimeDelRate/Indicator");
			
			
        	var oOnTimeChart = this.getView().byId("ontimeChart");
        	
        	var colvalue = oModel.getProperty("/OnTimeDelRate/colvalue");
        	//console.log(items);
        	for(var i=0;i<7;i++){
        		var oCol = new sap.suite.ui.microchart.ColumnMicroChartData();
        		//var cdata = parseFloat(oModel.getProperty("/TaskRate/colvalue"));
        	
        		// oCol.bindProperty("value","/TaskRate/colvalue");
        	
        		oCol.setValue(parseFloat(colvalue));
        		oCol.setColor(sap.m.ValueColor.Good);
        		oOnTimeChart.addColumn(oCol);
        	}
        
			//oOnTimeChart.bindElement("ColumnMicroChartData","/TaskRate/results");
		},
		press: function (oEvent) {
			MessageToast.show("The column micro chart is pressed.");
		}
		
		
 	});
});