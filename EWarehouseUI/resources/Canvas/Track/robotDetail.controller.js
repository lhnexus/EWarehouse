sap.ui.define(["sap/ui/core/mvc/Controller", "sap/ui/model/odata/v2/ODataModel", "../Util/svgUtil","sap/m/MessageToast"],
    function (Controller, ODataModel, MessageToast) {
        "use strict";
        function convertData(oEvent) {
            var oData,
                oModel = oEvent.getSource();
                // sContextPath = getContextPath();

            if (!oEvent.getParameters().success) {
                return;
            }

            oData = oModel.getData();
            oData.GoodTimeLine.forEach(function (oGTimeLine) {
                oGTimeLine.time = DateUtils.parseDate(oGTimeLine.time);

            });
            oModel.updateBindings(true);
        }

        return Controller.extend("Canvas.Track.robotDetail", {
            onInit: function () {
                var oModel = new sap.ui.model.json.JSONModel();
                oModel.loadData("Canvas/mockserver/data.json", null, false);

                var localModel = new sap.ui.model.json.JSONModel();

                localModel.setData( oModel.getData().Cars[0]);

                localModel.attachRequestCompleted(convertData);

                this.getView().setModel(localModel);

                this.getView().byId("TimePanel").addStyleClass("sapUiPanelCont");
            }
        });
    });