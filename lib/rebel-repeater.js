/**
 * Created by Leon Revill on 10/01/2016.
 * Blog: http://www.revilweb.com
 * GitHub: https://github.com/RevillWeb
 * Twitter: @RevillWeb
 */

class RblRepeater extends HTMLElement {
    createdCallback() {
        this.createShadowRoot();
    }
    attachedCallback() {
        this.render();
    }
    render() {
        const content = RblRepeater.fromJson(this.getAttribute('content'));
        const element = this.getAttribute('element').toLowerCase();
        const template = this.innerHTML;
        let html = "<" + element + ">";
        if (Array.isArray(content)) {
            content.forEach(function(item){
                html += RblRepeater.interpolate(template, item);
            });
        } else {
            throw new Error("Content should be an Array of objects.");
        }
        html += "</" + element + ">";
        this.shadowRoot.innerHTML = html;
        this.innerHTML = "";
    }
    attributeChangedCallback(name, value) {
        switch (name) {
            case "content":
                this.render();
                break;
        }
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
            } catch (e) {
                throw new Error("Invalid JSON string provided. ");
            }
        }
        return obj;
    }
}

document.registerElement("rbl-repeater", RblRepeater);