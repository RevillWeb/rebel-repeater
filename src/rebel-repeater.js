/**
 * Created by Leon Revill on 10/01/2016.
 * Blog: http://www.revilweb.com
 * GitHub: https://github.com/RevillWeb
 * Twitter: @RevillWeb
 */

class RebelRepeater extends HTMLElement {
    constructor(self) {
        self = super(self);
        self.content = [];
        self.template = self.innerHTML;
        return self;
    }
    connectedCallback() {
        this._shadow = (this.getAttribute('shadow') == "true");
        if (this._shadow) {
            this.attachShadow({"mode": "open"});
        }
        this.render();
    }
    render() {
        const element = this.getAttribute('element');
        let html = (element !== null ) ? "<" + element.toLowerCase() + ">" : "";
        if (Array.isArray(this.content)) {
            this.content.forEach((item) => {
                html += RebelRepeater.interpolate(this.template, item);
            });
        } else {
            throw new Error("Content should be an Array of objects.");
        }
        html += (element !== null ) ? "</" + element.toLowerCase() + ">" : "";
        if (this._shadow) {
            this.shadowRoot.innerHTML = html;
            this.innerHTML = "";
        } else {
            this.innerHTML = html;
        }
    }
    setContent(content) {
        this.content = content;
        this.render();
    }
    setTemplate(template) {
        this.template = template;
        this.render();
    }
    static interpolate(template, obj) {
        if (typeof obj == "object") {
            for (var key in obj) {
                const find = "${" + key + "}";
                if (template.indexOf(find) > -1) {
                    template = template.replace(find, obj[key]);
                    delete obj[key];
                }
            }
        }
        return template;
    }
    static fromJson(str) {
        let obj = null;
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
}

window.customElements.define("rebel-repeater", RebelRepeater);