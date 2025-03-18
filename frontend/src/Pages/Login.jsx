import { Link } from 'react-router-dom';
import { useFormik } from 'formik';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../Store/auth';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Login = () => {

  const initialValues = {
    email: '',
    password: ''
  };

  const navigate = useNavigate();

  const { storeToken } = useAuth();

  const formik = useFormik({
    initialValues: initialValues,
    onSubmit: async (values) => {
      console.log(values);
      try {
        const response = await fetch(`http://localhost:4001/api/auth/login`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(values)
        });
        if (!response.ok) {
          const errorData = await response.json();
          toast.error(errorData.msg || 'Login failed');
          return;
        }

        const data = await response.json();
        console.log(data.isAdmin);

        if (data.token) {
          storeToken(data.token);
          formik.resetForm();
          if (data.isAdmin === 'true') {
            navigate('/admin');
          } else {
            navigate('/');
          }
          toast.success(data.msg || 'Login Sucessful');
        } else {
          console.log('No token received');
        }
      } catch (error) {
        console.log('register error:', error.message);
      }
    }
  });

  return (
    <div
      className="flex items-center justify-center min-h-screen  bg-center relative"
      style={{ backgroundImage: "url('room.jpg')" }}
    >
      <div className="absolute inset-0 bg-black opacity-50"></div>

      <div className="absolute inset-0 bg-black bg-opacity-20 backdrop-blur-sm"></div>

      <div className="relative bg-white bg-opacity-90 p-8 rounded-lg shadow-lg w-96 z-10">
        <h2 className="text-3xl font-semibold text-center mb-6 text-gray-800">
          Login
        </h2>
        <form onSubmit={formik.handleSubmit}>
          <div className="mb-5">
            <label className="block text-gray-700 font-medium" htmlFor="email">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              onChange={formik.handleChange}
              value={formik.values.email}
              required
              className="mt-2 block w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
            />
          </div>
          <div className="">
            <label
              className="block text-gray-700 font-medium"
              htmlFor="password"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              onChange={formik.handleChange}
              value={formik.values.password}
              required
              className="mt-2 block w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
            />
          </div>
          <Link
            to="/forgotpassword"
            className="flex justify-end text-blue-600 mt-2 mb-5"
          >
            Forgot Password?
          </Link>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white font-semibold py-3 rounded-lg hover:bg-blue-700 transition shadow-lg transform hover:scale-105"
          >
            Login
          </button>
        </form>
        <p className="mt-6 text-center text-gray-600">
          Don't have an account?{' '}
          <Link to="/Register" className="text-blue-500 hover:underline">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
