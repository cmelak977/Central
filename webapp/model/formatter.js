sap.ui.define([], function () {
    "use strict"
    return {
        
        statusText: function (sStatus) {
            var resourceBundle = this.getView().getModel("i18n").getResourceBundle();
            switch (sStatus) {
                case "A":
                    return resourceBundle.getText("orderStatusA");
                case "B":
                    return resourceBundle.getText("orderStatusB");
                case "C":
                    return resourceBundle.getText("orderStatusC");
                default:
                    return sStatus;
            }
        }
    }

})