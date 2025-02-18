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
                this.oMyAvatar = this.oView.byId("avatarId");
                this._oPopover = Fragment.load({
                    id: this.oView.getId(),
                    name: "com.collak.home.central.central.view.Popover",
                    controller: this
                }).then(function(oPopover) {
                    this.oView.addDependent(oPopover);
                    this._oPopover = oPopover;
                }.bind(this));

            },
            handleHomeIconPress: function(oEvent) {
                MessageToast.show("Home icon pressed");
            },
            
            handleAvatarPress: function(oEvent) {
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
