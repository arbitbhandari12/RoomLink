import { useFormik } from 'formik';
import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2'; 

const NewPassword = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const { email, isVerified } = location.state || {};

  useEffect(() => {
    if (!isVerified) {
      navigate('/');
    }
  }, []);

  const initialValues = {
    password: '',
    confirmPassword: ''
  };

  const formik = useFormik({
    initialValues: initialValues,
    onSubmit: async (values) => {
      const { password, confirmPassword } = values;
      if (password !== confirmPassword) {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Passwords do not match'
        });
        return;
      }
      const response = await fetch(
        'http://localhost:4001/api/auth/resetPassword',
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, password })
        }
      );
      if (response.ok) {
        Swal.fire({
          icon: 'success',
          title: 'Success!',
          text: 'Password reset successful'
        }).then(() => navigate('/login'));
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Failed',
          text: 'Failed to reset password'
        });
      }
    }
  });

  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] bg-gray-100 p-4">
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-xl font-semibold mb-4">Reset Your Password</h2>
        <p className="text-gray-600 mb-4">
          Enter a new password for your account.
        </p>
        <form onSubmit={formik.handleSubmit}>
          <input
            type="password"
            name="password"
            placeholder="New Password"
            onChange={formik.handleChange}
            value={formik.values.password}
            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 mb-2"
          />
          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            onChange={formik.handleChange}
            value={formik.values.confirmPassword}
            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
          />
          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600"
          >
            Reset Password
          </button>
        </form>
      </div>
    </div>
  );
};

export default NewPassword;
