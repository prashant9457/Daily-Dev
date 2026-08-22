import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "@/pages/home/home";
import Todo from "@/pages/todo/todo";
import Login from "@/pages/auth/Login";

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/todo" element={<Todo />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}