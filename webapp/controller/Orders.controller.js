sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageToast",
    "sap/ui/core/Fragment",
    "sap/ui/core/routing/History"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, MessageToast, Fragment, History) {
        "use strict";

        return Controller.extend("com.collak.home.central.central.controller.Orders", {
            onInit: function () {
                this.oMyAvatar = this.oView.byId("avatarId2");
                this._oPopover = Fragment.load({
                    id: this.oView.getId(),
                    name: "com.collak.home.central.central.view.fragment.Popover",
                    controller: this
                }).then(function (oPopover) {
                    this.oView.addDependent(oPopover);
                    this._oPopover = oPopover;
                }.bind(this));

            },
            handleHomeIconPress: function (oEvent) {
                const oHistory = History.getInstance();
                const sPreviousHash = oHistory.getPreviousHash();

                if (sPreviousHash !== undefined) {
                    window.history.go(-1);
                } else {
                    const oRouter = this.getOwnerComponent().getRouter();
                    oRouter.navTo("RouteHome", {}, true);
                }

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
            }

        });
    });
