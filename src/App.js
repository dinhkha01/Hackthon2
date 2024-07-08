"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const Todo_1 = __importDefault(require("./components/Todo/Todo"));
function App() {
    return (<>
      <Todo_1.default />
    </>);
}
exports.default = App;
