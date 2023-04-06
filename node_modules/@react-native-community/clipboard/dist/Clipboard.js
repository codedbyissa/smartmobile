"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Clipboard = void 0;
var NativeClipboard_1 = __importDefault(require("./NativeClipboard"));
/**
 * `Clipboard` gives you an interface for setting and getting content from Clipboard on both iOS and Android
 */
exports.Clipboard = {
    /**
     * Get content of string type, this method returns a `Promise`, so you can use following code to get clipboard content
     * ```javascript
     * async _getContent() {
     *   var content = await Clipboard.getString();
     * }
     * ```
     */
    getString: function () {
        return NativeClipboard_1.default.getString();
    },
    /**
     * Set content of string type. You can use following code to set clipboard content
     * ```javascript
     * _setContent() {
     *   Clipboard.setString('hello world');
     * }
     * ```
     * @param the content to be stored in the clipboard.
     */
    setString: function (content) {
        NativeClipboard_1.default.setString(content);
    },
    /**
     * Returns whether the clipboard has content or is empty.
     * This method returns a `Promise`, so you can use following code to get clipboard content
     * ```javascript
     * async _hasContent() {
     *   var hasContent = await Clipboard.hasString();
     * }
     * ```
     */
    hasString: function () {
        return NativeClipboard_1.default.hasString();
    },
    /**
     * (IOS Only)
     * Returns whether the clipboard has content or is empty.
     * This method returns a `Promise`, so you can use following code to get clipboard content
     * ```javascript
     * async _hasContent() {
     *   var hasContent = await Clipboard.hasString();
     * }
     * ```
     */
    hasURL: function () {
        return NativeClipboard_1.default.hasURL();
    },
};
