'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

Object.defineProperty(exports, "__esModule", {
    value: true
});

function _typeof(obj) { return obj && typeof Symbol !== "undefined" && obj.constructor === Symbol ? "symbol" : typeof obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * Created by Leon Revill on 10/01/2016.
 * Blog: http://www.revilweb.com
 * GitHub: https://github.com/RevillWeb
 * Twitter: @RevillWeb
 */

var RebelRepeater = exports.RebelRepeater = (function (_HTMLTemplateElement) {
    _inherits(RebelRepeater, _HTMLTemplateElement);

    function RebelRepeater() {
        _classCallCheck(this, RebelRepeater);

        return _possibleConstructorReturn(this, Object.getPrototypeOf(RebelRepeater).apply(this, arguments));
    }

    _createClass(RebelRepeater, [{
        key: 'createdCallback',
        value: function createdCallback() {
            this.content = [];
            this.template = this.innerHTML;
            if (this.getAttribute('shadow') == "true") {
                this.createShadowRoot();
            }
        }
    }, {
        key: 'attachedCallback',
        value: function attachedCallback() {
            this.render();
        }
    }, {
        key: 'render',
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
            if (this.getAttribute('shadow') == "true") {
                this.shadowRoot.innerHTML = html;
                this.innerHTML = "";
            } else {
                this.innerHTML = html;
            }
        }
    }, {
        key: 'setContent',
        value: function setContent(content) {
            this.content = content;
            this.render();
        }
    }, {
        key: 'setTemplate',
        value: function setTemplate(template) {
            this.template = template;
            this.render();
        }
    }, {
        key: 'attributeChangedCallback',
        value: function attributeChangedCallback(name) {
            switch (name) {
                case "content":
                    this.content = RebelRepeater.fromJson(this.getAttribute('content'));
                    this.render();
                    break;
            }
        }
    }], [{
        key: 'interpolate',
        value: function interpolate(template, obj) {
            if ((typeof obj === 'undefined' ? 'undefined' : _typeof(obj)) == "object") {
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
        key: 'fromJson',
        value: function fromJson(str) {
            var obj = null;
            if (typeof str == "string") {
                try {
                    obj = JSON.parse(str);
                } catch (e) {
                    throw new Error("Invalid JSON string provided. ");
                }
            }
            return obj;
        }
    }]);

    return RebelRepeater;
})(HTMLTemplateElement);

document.registerElement("rebel-repeater", RebelRepeater);
