import { Navigate } from 'react-router-dom';

function ProtectedRoute({ children }) {
  const token = localStorage.getItem('token');

  // اگر توکن وجود نداشت → ریدایرکت به صفحه ورود/ثبت نام
  if (!token) {
    return <Navigate to="/sign-or-register" replace />;
  }

  try {
    // دیکد کردن payload توکن
    const payload = JSON.parse(atob(token.split('.')[1]));

    // چک کردن اعتبار توکن (expire)
    if (payload.exp * 1000 < Date.now()) {
      localStorage.removeItem('token'); // پاک کردن توکن منقضی شده
      return <Navigate to="/sign-or-register" replace />;
    }

    // توکن معتبر → اجازه نمایش صفحه
    return children;
  } catch (err) {
    // اگر فرمت توکن اشتباه بود
    localStorage.removeItem('token');
    return <Navigate to="/sign-or-register" replace />;
  }
}

export default ProtectedRoute;
