"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Clipboard = void 0;
exports.Clipboard = {
    getString: function () {
        if (navigator && navigator.clipboard) {
            return navigator.clipboard.readText();
        }
        else {
            var el = document.createElement('textarea');
            document.body.appendChild(el);
            el.select();
            document.execCommand('paste');
            var value = el.innerText;
            document.body.removeChild(el);
            return Promise.resolve(value);
        }
    },
    setString: function (content) {
        if (navigator && navigator.clipboard) {
            navigator.clipboard.writeText(content);
        }
        else {
            var el = document.createElement('textarea');
            el.value = content;
            document.body.appendChild(el);
            el.select();
            document.execCommand('copy');
            document.body.removeChild(el);
        }
    },
};
