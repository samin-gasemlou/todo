import Home from './pages/Home';
import { Routes, Route } from 'react-router-dom';
import SignOrRegisteri from './pages/SignOrRegisteri';
import Register from './pages/Register';
import SignIn from './pages/SignIn';
import AddTasks from './pages/AddTasks';
import Tasks from './pages/Tasks';
import ProtectedRoute from './components/ProtectedRoute';
function App() {
  return (
    <Routes>
      <Route path="/sign-or-register" element={<SignOrRegisteri />} />
      <Route path="/login" element={<SignIn />} />
      <Route path="/register" element={<Register />} />
      <Route path="/add-task" element={<AddTasks />} />
      <Route path="/tasks/:date" element={<Tasks />} />

      <Route
        path="/"
        element={
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

export default App;
