
import { signIn, getCsrfToken, useSession, getSession } from "next-auth/react";
import { Router, useRouter } from "next/router";
import { useState } from "react";
interface FormLogin {
  email: string,
  password: string
}

const initFormData: FormLogin = {
  email: '',
  password: ''
}

const Login = ({ csrfToken }) => {
  const [formData, setFormData] = useState(initFormData);
  const [error, setError] = useState(null);
  const route = useRouter()
  const { data: session, status } = useSession();
  const handleOnChange = (key: string) => (e: any) => {
    const value = e.target.value
    setFormData({
      ...formData,
      [key]: value
    })
    setError(null)
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await signIn("credentials", {
      email: formData.email,
      password: formData.password,
      redirect: false,
      callbackUrl: `${window.location.origin}`
    });
    if (res?.error) {
      setError(res.error)
    } else {
      route.push(res.url)
    }
  };

  if (status === "authenticated") {
    return <div className="w-[400px], h-[400px] bg-slate-600 flex justify-center items-center">
      <h2>You are signed. Welcome {session.user.name}</h2>
    </div>
  }

  return (
    <div className="ass1-login">
      <div className="ass1-login__logo">
        <a href="index.html" className="ass1-logo">
          BraveSocial
        </a>
      </div>
      <div className="ass1-login__content">
        <p>Đăng nhập</p>
        <div className="ass1-login__form">
          <form action="#" onSubmit={handleSubmit}>
            <input name="csrfToken" type="hidden" defaultValue={csrfToken} />
            <input
              value={formData.email}
              onChange={handleOnChange("email")}
              type="text"
              className="form-control"
              placeholder="Email"
              required
            />
            <input
              value={formData.password}
              onChange={handleOnChange("password")}
              type="password"
              className="form-control"
              placeholder="Mật khẩu"
              required
            />

            <div className="ass1-login__send">
              <a href="dang-ky.html">Đăng ký một tài khoản</a>
              <button type="submit" className="ass1-btn">
                Đăng nhập
              </button>
              <p className="text-red-400">{error}</p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
export default Login;

export async function getServerSideProps(ctx) {
  const csrfToken = await getCsrfToken(ctx);
  const session = await getSession(ctx);

  return {
    props: {
      csrfToken,
      session
    },
  };
}
