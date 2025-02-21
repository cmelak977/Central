sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageToast",
    "sap/ui/core/Fragment",
    "sap/ui/core/routing/History",
    "sap/ui/model/json/JSONModel"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, MessageToast, Fragment, History, JSONModel ) {
        "use strict";

        return Controller.extend("com.collak.home.central.central.controller.Order", {
            onInit: function () {
                
                this.oMyAvatar = this.oView.byId("avatarId23");
                this._oPopover = Fragment.load({
                    id: this.oView.getId(),
                    name: "com.collak.home.central.central.view.fragment.Popover",
                    controller: this
                }).then(function (oPopover) {
                    this.oView.addDependent(oPopover);
                    this._oPopover = oPopover;
                }.bind(this));

                var oRouter = this.getOwnerComponent().getRouter();
                oRouter.getRoute("Order").attachPatternMatched(this._onObjectMatched, this);
                

            },
            _onObjectMatched: function (oEvent) {
                this.getView().bindElement(
                    {
                         path: "/" + window.decodeURIComponent(oEvent.getParameter("arguments").invoicePath),
                         model: "Orders"
                    }
                )
            },

            handleHomeIconPress: function (oEvent) {
                const oHistory = History.getInstance();
                const sPreviousHash = oHistory.getPreviousHash();

                if (sPreviousHash !== undefined) {
                    window.history.go(-1);
                } else {
                    const oRouter = this.getOwnerComponent().getRouter();
                    oRouter.navTo("GoToOrders", {}, true);
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
            },
        });
    });
