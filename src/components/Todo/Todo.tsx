import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  List,
  ListItem,
  ListItemText,
  Checkbox,
  IconButton,
  Paper,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import AddIcon from "@mui/icons-material/Add";
import { Todo as TodoType, initialTodos } from "./data";

const Todo: React.FC = () => {
  const [todos, setTodos] = useState<TodoType[]>(() => {
    const savedTodos = localStorage.getItem("todos");
    return savedTodos ? JSON.parse(savedTodos) : initialTodos;
  });
  const [input, setInput] = useState<string>("");
  const [error, setError] = useState<string>("");

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
    setError("");
  };

  const addTodo = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (input.trim() === "") {
      setError("Task name không được để trống");
      return;
    }
    if (
      todos.some(
        (todo) => todo.name.toLowerCase() === input.trim().toLowerCase()
      )
    ) {
      setError("Task name đã bị trùng");
      return;
    }
    const newTodo: TodoType = {
      id: Date.now(),
      name: input.trim(),
      completed: false,
    };
    setTodos([...todos, newTodo]);
    setInput("");
  };

  const toggleTodo = (id: number) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const deleteTodo = (id: number) => {
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

  return (
    <Box sx={{ maxWidth: 500, margin: "auto", p: 2 }}>
      <div>
        <Typography variant="h6" component="h1" gutterBottom align="center">
          TodoInput
        </Typography>
      </div>

      <Box component="form" onSubmit={addTodo} sx={{ mb: 2 }}>
        <TextField
          fullWidth
          variant="outlined"
          placeholder="New Todo"
          value={input}
          onChange={handleInputChange}
          error={!!error}
          helperText={error}
          sx={{ mb: 1 }}
          InputProps={{
            startAdornment: (
              <AddIcon
                sx={{
                  color: "action.active",
                  mr: 1,
                }}
              />
            ),
          }}
        />
        <Button
          fullWidth
          variant="contained"
          type="submit"
          sx={{
            bgcolor: "outline-light",
            "outline-light": { bgcolor: "#009688" },
          }}
        >
          Add new task
        </Button>
      </Box>

      <Typography variant="h6" component="h2" gutterBottom align="center">
        TodoList
      </Typography>
      <Paper elevation={0} sx={{ mb: 2 }}>
        <List sx={{ bgcolor: "background.paper" }}>
          {todos.map((todo) => (
            <ListItem
              key={todo.id}
              disablePadding
              sx={{
                borderBottom: "1px solid #e0e0e0",
                "&:last-child": { borderBottom: "none" },
              }}
            >
              <ListItemText
                primary={todo.name}
                sx={{
                  textDecoration: todo.completed ? "line-through" : "none",
                  color: todo.completed ? "red" : "black",
                }}
              />
              <Checkbox
                edge="start"
                checked={todo.completed}
                onChange={() => toggleTodo(todo.id)}
                sx={{
                  color: "#4db6ac",
                  "&.Mui-checked": { color: "#4db6ac" },
                }}
              />
              <IconButton
                edge="end"
                aria-label="edit"
                sx={{ color: "#ffc107" }}
              >
                <EditIcon />
              </IconButton>
              <IconButton
                edge="end"
                aria-label="delete"
                onClick={() => deleteTodo(todo.id)}
                sx={{ color: "#f44336" }}
              >
                <DeleteIcon />
              </IconButton>
            </ListItem>
          ))}
        </List>
      </Paper>

      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Button
          variant="contained"
          onClick={deleteDoneTasks}
          sx={{ bgcolor: "#f44336", "&:hover": { bgcolor: "#d32f2f" } }}
        >
          Delete done tasks
        </Button>
        <Button
          variant="contained"
          onClick={deleteAllTasks}
          sx={{ bgcolor: "#f44336", "&:hover": { bgcolor: "#d32f2f" } }}
        >
          Delete all tasks
        </Button>
      </Box>
    </Box>
  );
};

export default Todo;
