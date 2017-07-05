sap.ui.define(["sap/ui/core/mvc/Controller", "sap/m/MessageToast"],
	function (Controller,MessageToast){
	"use strict";
 
 	return Controller.extend("Panels.MiniCharts.alert_notify", {
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
		},

        onAfterRendering: function(){

            var oAlertNum = this.getView().byId("alertNum");
            var oAlertIcon = this.getView().byId("alerticon");

            this._loadData(oAlertNum,oAlertIcon);

        },


        _loadData: function(oElement, oElement2){


            setInterval(function(){

                var num = Math.floor(Math.random()*10);

                oElement.setValue(num);

                if(num>=5){
                    oElement.setValueColor("Error");
                    oElement2.setSrc("sap-icon://message-warning");
                    oElement2.setColor("red");
				}
				else if(num==0){
                    oElement.setValueColor("Good");
                    oElement2.setSrc("sap-icon://message-information");
                    oElement2.setColor("green");

				}
				else{
                    oElement.setValueColor("Critical");
                    oElement2.setSrc("sap-icon://message-warning");
                    oElement2.setColor("orange");
				}
            },1000);

        }
		
		
 	});
});