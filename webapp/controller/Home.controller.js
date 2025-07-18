sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageToast",
    "sap/ui/core/Fragment"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, MessageToast, Fragment) {
        "use strict";

        return Controller.extend("com.collak.home.central.central.controller.Home", {
            onInit: function () {

                $.ajax({
                    url: "https://domov.collak.cz/v2/app/api/user", // API endpoint
                    method: "GET",
                    success: function (data) {
                        //console.log("Data z API:", data);
                        // Uložení dat do modelu, pokud je potřebuješ
                       // that.getView().getModel("userModel").setData(data);
                    },
                    error: function (xhr) {
                        //console.error("Chyba při volání API:", xhr);
                        // Přesměrování na login už řeší interceptor, takže tady nic neděláme
                    }
                });

                //Avatar popover
                this.oMyAvatar = this.oView.byId("avatarId");
                this._oPopover = Fragment.load({
                    id: this.oView.getId(),
                    name: "com.collak.home.central.central.view.fragment.Popover",
                    controller: this
                }).then(function (oPopover) {
                    this.oView.addDependent(oPopover);
                    this._oPopover = oPopover;
                }.bind(this));

                //ShellBar navigation
                var oViewModel = new sap.ui.model.json.JSONModel({
                    shellTitle: "Dashboard"
                });
                this.getView().setModel(oViewModel, "viewModel");

            },
           
            handleHomeIconPress: function (oEvent) {
                MessageToast.show("Již jsi na úvodní obrazovce");
            },

            handleAvatarPress: function (oEvent) {
                var oEventSource = oEvent.getSource(),
                    bActive = this.oMyAvatar.getActive();
                this.oMyAvatar.setActive(!bActive);

                if (bActive) {
                    this._oPopover.close();
                } else {
                    this._oPopover.openBy(oEventSource);
                }
            },
            onPopoverClose: function () {
                this.oMyAvatar.setActive(false);
            },
            handleTilePress: function (oEvent) {
                this.getOwnerComponent().getRouter().navTo(oEvent.getSource().data("route"));
            },

            GoToOrders: function () {
                this.getOwnerComponent().getRouter().navTo("GoToOrders");
            }

        });
    });
