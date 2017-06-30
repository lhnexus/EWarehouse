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
			oOnTimeDelNum.bindProperty("value","/OnTimeDelRate/0/Value");
			oOnTimeDelNum.bindProperty("scale","/OnTimeDelRate/0/scale");
			oOnTimeDelNum.bindProperty("indicator","/OnTimeDelRate/0/Indicator");
			
			
        	var oOnTimeChart = this.getView().byId("ontimeChart");
        	
        	var length = oModel.getData().OnTimeDelRate[0].Vperday.length;                         
        	
        	
        	//var colvalue = oModel.getProperty("/OnTimeDelRate/colvalue");
        	//console.log(items);
        	for(var i=0;i<length;i++){
        		var oCol = new sap.suite.ui.microchart.ColumnMicroChartData();
          		oCol.setValue(parseFloat(oModel.getData().OnTimeDelRate[0].Vperday[i].colvalue));
        		oCol.setColor(eval("sap.m.ValueColor."+oModel.getData().OnTimeDelRate[0].Vperday[i].ValueColor));
        		oOnTimeChart.addColumn(oCol);
        	}
        
			//oOnTimeChart.bindElement("ColumnMicroChartData","/TaskRate/results");
		},
		press: function (oEvent) {
			MessageToast.show("The column micro chart is pressed.");
		}
		
		
 	});
});