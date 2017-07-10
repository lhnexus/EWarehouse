sap.ui.define(["sap/ui/core/mvc/Controller","sap/m/MessageToast", "./Util/svgUtil"],
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

            onClickTrigger: function(){
                var oMovingModel = this.getView().getModel();

                var carnums = oMovingModel.getData().Cars.length;
                var carnum = 0;

                while(carnum<carnums) {

                    var carid = oMovingModel.getData().Cars[carnum].id;
                    var rect = d3.select("#"+carid);
                    moving(oMovingModel,carnum,rect);
                    carnum++;
                }

            },




            press: function (oEvent) {
                MessageToast.show("The column micro chart is pressed.");
            }


        });
    });