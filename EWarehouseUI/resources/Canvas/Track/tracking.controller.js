sap.ui.define(["sap/ui/core/mvc/Controller", "sap/ui/model/odata/v2/ODataModel", "../Util/svgUtil"],
    function (Controller, ODataModel) {
        "use strict";

        return Controller.extend("Canvas.Track.tracking", {
            onInit: function () {
                // this._initMockServer();
                var oModel = new sap.ui.model.json.JSONModel();

                // oModel.setData(data);
                oModel.loadData("Canvas/mockserver/data.json", null, false);
                //this.getView().setModel(oModel);
                this.getView().setModel(oModel);


                //init room map


            },

            onAfterRendering: function () {
                var minArea, curColor;


                var oMovingModel = this.getView().getModel();
                var canvas_width = parseInt(oMovingModel.getData().Canvas.width);
                var canvas_height = parseInt(oMovingModel.getData().Canvas.height);

                var svg = d3.select("#Canvas_Main--tracking--tpage-cont").append("svg")
                    .attr("width", canvas_width)
                    .attr("height", canvas_height);

                //factory counter initial
                initCounter(svg, oMovingModel);
                initAreas(svg, oMovingModel);

                //Car moving initial
                var carnums = oMovingModel.getData().Cars.length;
                var carnum = 0;

                while(carnum<carnums) {

                    initCars(svg, oMovingModel,carnum);
                    carnum++;
                }

            }


        });
    });