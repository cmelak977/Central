/**
 * eslint-disable @sap/ui5-jsdocs/no-jsdoc
 */

sap.ui.define([
    "sap/ui/core/UIComponent",
    "sap/ui/Device",
    "com/collak/home/central/central/model/models"
],
    function (UIComponent, Device, models) {
        "use strict";

        return UIComponent.extend("com.collak.home.central.central.Component", {
            metadata: {
                manifest: "json"
            },

            /**
             * The component is initialized by UI5 automatically during the startup of the app and calls the init method once.
             * @public
             * @override
             */
            init: function () {
                // call the base component's init function
                UIComponent.prototype.init.apply(this, arguments);

                // enable routing
                this.getRouter().initialize();

                // set the device model
                this.setModel(models.createDeviceModel(), "device");

                var oModel = new sap.ui.model.json.JSONModel();
                oModel.loadData("model/tiles.json"); // Ujisti se, že soubor je ve složce "model"
                this.setModel(oModel, "tileModel");

                // Nastavení globálního AJAX interceptoru
                $.ajaxSetup({
                    beforeSend: function (xhr) {
                        //console.log("Odesílám request na API...");
                    },
                    complete: function (xhr) {
                        if (xhr.status === 404) {
                            //window.location.href = "/login";
                        }
                    }
                });

            }
        });
    }
);