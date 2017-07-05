sap.ui.define(["sap/ui/core/mvc/Controller","sap/m/MessageToast"],
    function (Controller,MessageToast) {
        "use strict";

        return Controller.extend("Track.Main", {
            onInit: function () {


            },

            onAfterRendering: function () {


            },


            press: function (oEvent) {
                MessageToast.show("The column micro chart is pressed.");
            }


        });
    });