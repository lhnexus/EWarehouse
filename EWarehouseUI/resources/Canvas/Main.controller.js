sap.ui.define(["sap/ui/core/mvc/Controller","sap/m/MessageToast"],
    function (Controller,MessageToast) {
        "use strict";

        return Controller.extend("Canvas.Main", {
            onInit: function () {

                var oModel = new sap.ui.model.json.JSONModel();

                // oModel.setData(data);
                oModel.loadData("Canvas/mockserver/data.json", null, false);
                var tracking = this.getView().byId("tracking");
                //this.getView().setModel(oModel);
                this.getView().setModel(oModel);
                tracking.setHeight(oModel.getData().Canvas.height+"px");
            },

            onAfterRendering: function () {


            },


            press: function (oEvent) {
                MessageToast.show("The column micro chart is pressed.");
            }


        });
    });