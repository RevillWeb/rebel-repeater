"use strict";

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * Created by Leon Revill on 10/01/2016.
 * Blog: http://www.revilweb.com
 * GitHub: https://github.com/RevillWeb
 * Twitter: @RevillWeb
 */

var RebelRepeater = function (_HTMLElement) {
    _inherits(RebelRepeater, _HTMLElement);

    function RebelRepeater(self) {
        var _this, _ret;

        _classCallCheck(this, RebelRepeater);

        self = (_this = _possibleConstructorReturn(this, (RebelRepeater.__proto__ || Object.getPrototypeOf(RebelRepeater)).call(this, self)), _this);
        self.content = [];
        self.template = self.innerHTML;
        return _ret = self, _possibleConstructorReturn(_this, _ret);
    }

    _createClass(RebelRepeater, [{
        key: "connectedCallback",
        value: function connectedCallback() {
            this._shadow = this.getAttribute('shadow') == "true";
            if (this._shadow) {
                this.attachShadow({ "mode": "open" });
            }
            this.render();
        }
    }, {
        key: "render",
        value: function render() {
            var _this2 = this;

            var element = this.getAttribute('element');
            var html = element !== null ? "<" + element.toLowerCase() + ">" : "";
            if (Array.isArray(this.content)) {
                this.content.forEach(function (item) {
                    html += RebelRepeater.interpolate(_this2.template, item);
                });
            } else {
                throw new Error("Content should be an Array of objects.");
            }
            html += element !== null ? "</" + element.toLowerCase() + ">" : "";
            if (this._shadow) {
                this.shadowRoot.innerHTML = html;
                this.innerHTML = "";
            } else {
                this.innerHTML = html;
            }
        }
    }, {
        key: "setContent",
        value: function setContent(content) {
            this.content = content;
            this.render();
        }
    }, {
        key: "setTemplate",
        value: function setTemplate(template) {
            this.template = template;
            this.render();
        }
    }], [{
        key: "interpolate",
        value: function interpolate(template, obj) {
            if ((typeof obj === "undefined" ? "undefined" : _typeof(obj)) == "object") {
                for (var key in obj) {
                    var find = "${" + key + "}";
                    if (template.indexOf(find) > -1) {
                        template = template.replace(find, obj[key]);
                        delete obj[key];
                    }
                }
            }
            return template;
        }
    }, {
        key: "fromJson",
        value: function fromJson(str) {
            var obj = null;
            if (typeof str == "string") {
                try {
                    obj = JSON.parse(str);
                    console.log(obj);
                } catch (e) {
                    throw new Error("Invalid JSON string provided. ");
                }
            }
            return obj;
        }
    }]);

    return RebelRepeater;
}(HTMLElement);

window.customElements.define("rebel-repeater", RebelRepeater);
