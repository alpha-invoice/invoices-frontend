"use strict";
var platform_browser_dynamic_1 = require('@angular/platform-browser-dynamic');
var forms_1 = require('@angular/forms');
var core_1 = require('@angular/core');
var _1 = require('./app/');
var http_1 = require('@angular/http');
if (_1.environment.production) {
    core_1.enableProdMode();
}
platform_browser_dynamic_1.bootstrap(_1.AppComponent, [
    http_1.HTTP_PROVIDERS,
    forms_1.provideForms(),
    forms_1.disableDeprecatedForms()
]).catch(function (err) { return console.log(err); });
//# sourceMappingURL=main.js.map