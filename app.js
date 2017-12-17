var app = angular.module("formularoj", ["ui.router", "ui.mask", "xeditable", "ngMessages"])

app.run(function(editableOptions) {
  editableOptions.theme = 'bs3';
});
