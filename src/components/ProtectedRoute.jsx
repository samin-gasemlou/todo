import { Navigate } from 'react-router-dom';

function ProtectedRoute({ children }) {
  const token = localStorage.getItem('token');

  // اگر توکن وجود نداشت → بفرست به SignOrRegister
  if (!token) {
    return <Navigate to="/sign-or-register" replace />;
  }

  // توکن هست → اجازه بده صفحه نشون داده بشه
  return children;
}

export default ProtectedRoute;
