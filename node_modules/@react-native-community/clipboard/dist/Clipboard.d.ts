/**
 * `Clipboard` gives you an interface for setting and getting content from Clipboard on both iOS and Android
 */
export declare const Clipboard: {
    /**
     * Get content of string type, this method returns a `Promise`, so you can use following code to get clipboard content
     * ```javascript
     * async _getContent() {
     *   var content = await Clipboard.getString();
     * }
     * ```
     */
    getString(): Promise<string>;
    /**
     * Set content of string type. You can use following code to set clipboard content
     * ```javascript
     * _setContent() {
     *   Clipboard.setString('hello world');
     * }
     * ```
     * @param the content to be stored in the clipboard.
     */
    setString(content: string): void;
    /**
     * Returns whether the clipboard has content or is empty.
     * This method returns a `Promise`, so you can use following code to get clipboard content
     * ```javascript
     * async _hasContent() {
     *   var hasContent = await Clipboard.hasString();
     * }
     * ```
     */
    hasString(): any;
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
    hasURL(): any;
};
