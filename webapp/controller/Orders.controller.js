sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageToast",
    "sap/ui/core/Fragment",
    "sap/ui/core/routing/History",
    "sap/ui/model/json/JSONModel",
    "../model/formatter",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, MessageToast, Fragment, History, JSONModel, formatter, Filter, FilterOperator) {
        "use strict";

        return Controller.extend("com.collak.home.central.central.controller.Orders", {
            formatter: formatter,

            onInit: function () {

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
                    shellTitle: "Objednávky"
                });
                this.getView().setModel(oViewModel, "viewModel");

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
            },

            onFilterOrders: function (oEvent) {

                //build filter
                var aFilter = [];
                var sQuery = oEvent.getParameter("query");
                if (sQuery) {
                    aFilter.push(new Filter("ProductName", FilterOperator.Contains, sQuery))
                }

                //Filter
                var oList = this.byId("orderList");
                var oBinding = oList.getBinding("items");
                oBinding.filter(aFilter);


            },
            onOrderPress: function (oEvent) {
                var oItem = oEvent.getSource();
                const oRouter = this.getOwnerComponent().getRouter();
                oRouter.navTo("Order", { invoicePath: window.encodeURIComponent(oItem.getBindingContext("Orders").getPath().substr(1)) 

                });
            }

        });
    });
