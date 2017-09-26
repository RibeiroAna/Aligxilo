var app = angular.module("formularoj", ["ui.router", "ui.mask", "xeditable"])

app.run(function(editableOptions) {
  editableOptions.theme = 'bs3';
});
