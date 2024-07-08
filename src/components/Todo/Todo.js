"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importStar(require("react"));
const material_1 = require("@mui/material");
const Delete_1 = __importDefault(require("@mui/icons-material/Delete"));
const Edit_1 = __importDefault(require("@mui/icons-material/Edit"));
const icons_material_1 = require("@mui/icons-material");
const data_1 = require("./data");
const Todo = () => {
    const [todos, setTodos] = (0, react_1.useState)(() => {
        const savedTodos = localStorage.getItem("todos");
        return savedTodos ? JSON.parse(savedTodos) : data_1.initialTodos;
    });
    const [input, setInput] = (0, react_1.useState)("");
    const [error, setError] = (0, react_1.useState)("");
    (0, react_1.useEffect)(() => {
        localStorage.setItem("todos", JSON.stringify(todos));
    }, [todos]);
    const handleInputChange = (e) => {
        setInput(e.target.value);
        setError("");
    };
    const addTodo = (e) => {
        e.preventDefault();
        if (input.trim() === "") {
            setError("Task name không được để trống");
            return;
        }
        if (todos.some((todo) => todo.name.toLowerCase() === input.trim().toLowerCase())) {
            setError("Task name đã bị trùng");
            return;
        }
        const newTodo = {
            id: Date.now(),
            name: input,
            completed: false,
        };
        setTodos([...todos, newTodo]);
        setInput("");
    };
    const toggleTodo = (id) => {
        setTodos(todos.map((todo) => todo.id === id ? Object.assign(Object.assign({}, todo), { completed: !todo.completed }) : todo));
    };
    const deleteTodo = (id) => {
        if (confirm("Chắc chắn muốn xóa ?")) {
            setTodos(todos.filter((todo) => todo.id !== id));
        }
    };
    const deleteDoneTasks = () => {
        if (confirm("Chắc chắn muốn xóa ?")) {
            setTodos(todos.filter((todo) => !todo.completed));
        }
    };
    const deleteAllTasks = () => {
        if (confirm("Chắc chắn muốn xóa ?")) {
            setTodos([]);
        }
    };
    return (<material_1.Box sx={{ maxWidth: 500, margin: "auto", p: 3 }}>
      <div>
        <material_1.Typography variant="h6" component="h1" gutterBottom align="center">
          TodoInput
        </material_1.Typography>
      </div>

      <material_1.Box component="form" onSubmit={addTodo} sx={{ mb: 2 }}>
        <material_1.TextField fullWidth variant="outlined" placeholder="New Todo" value={input} onChange={handleInputChange} error={!!error} helperText={error} sx={{
            mb: 2,
        }} InputProps={{
            startAdornment: (<icons_material_1.FavoriteBorder sx={{
                    color: "action.active",
                    mr: 1,
                }}/>),
        }}/>
        <material_1.Button fullWidth variant="contained" type="submit" sx={{
            bgcolor: "outline-light",
            "outline-light": { bgcolor: "#009688" },
        }}>
          Add new task
        </material_1.Button>
      </material_1.Box>

      <material_1.Typography variant="h6" component="h2" gutterBottom align="center">
        TodoList
      </material_1.Typography>
      <material_1.Paper elevation={0} sx={{ mb: 3 }}>
        <material_1.List sx={{ bgcolor: "background.paper" }}>
          {todos.map((todo) => (<material_1.ListItem key={todo.id} disablePadding sx={{
                border: "2px solid #e0e0e0",
                borderRadius: 3,
                mb: 1,
                p: 1,
            }}>
              <material_1.ListItemText primary={todo.name} sx={{
                textDecoration: todo.completed ? "line-through" : "none",
                color: todo.completed ? "red" : "black",
            }}/>
              <material_1.Checkbox edge="start" checked={todo.completed} onChange={() => toggleTodo(todo.id)} sx={{
                color: "#4db6ac",
                "&.Mui-checked": { color: "#4db6ac" },
            }}/>
              <material_1.IconButton edge="end" aria-label="edit" sx={{ color: "#ffc107", mr: 0.5 }}>
                <Edit_1.default />
              </material_1.IconButton>
              <material_1.IconButton edge="end" aria-label="delete" onClick={() => deleteTodo(todo.id)} sx={{ color: "#f44336", mr: 1 }}>
                <Delete_1.default />
              </material_1.IconButton>
            </material_1.ListItem>))}
        </material_1.List>
      </material_1.Paper>

      <material_1.Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <material_1.Button variant="contained" onClick={deleteDoneTasks} sx={{ bgcolor: "#f44336", "&:hover": { bgcolor: "#d32f2f" } }}>
          Delete done tasks
        </material_1.Button>
        <material_1.Button variant="contained" onClick={deleteAllTasks} sx={{ bgcolor: "#f44336", "&:hover": { bgcolor: "#d32f2f" } }}>
          Delete all tasks
        </material_1.Button>
      </material_1.Box>
    </material_1.Box>);
};
exports.default = Todo;
