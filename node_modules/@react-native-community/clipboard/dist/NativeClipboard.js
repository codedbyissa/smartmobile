'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
var react_native_1 = require("react-native");
// Separated file for Native Clipboard to be ready to switch to Turbo Module when it becomes public
// TODO: uncomment when Turbo module is available
// export interface Spec extends TurboModule {
//   +getConstants: () => {||};
//   +getString: () => Promise<string>;
//   +setString: (content: string) => void;
//   +hasString: () => Promise<boolean>;
// }
exports.default = react_native_1.NativeModules.RNCClipboard;
