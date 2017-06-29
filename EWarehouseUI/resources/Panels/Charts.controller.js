sap.ui.define(['sap/m/MessageToast'],
	function (MessageToast){
	"use strict";
 
 	return sap.ui.controller("Panels.Charts", {
		onInit: function() {
			
	
		},
		
		onAfterRendering: function(){
		
		},
		
		
		press: function (oEvent) {
			MessageToast.show("The column micro chart is pressed.");
		}
		
		
 	});
});