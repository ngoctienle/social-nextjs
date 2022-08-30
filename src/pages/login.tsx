import Link from "next/link"
import { useRouter } from "next/router"
import { useEffect } from "react"
// import { useGlobalState } from "../states"
import { useNotAuthen } from "../helpers/useAuthen"

const Login = () => {
    useNotAuthen()

    const router = useRouter()
    const errorString = router.query.error

    useEffect(() => {
        if (errorString) {
            alert("Login failed!!")
            window.history.pushState({}, document.title, "/login")
        }
    }, [errorString])

    const handleSubmitForm = (e) => {
        e.preventDefault()
        e.target.submit()
    }

    return (
        <div className="ass1-login">
            <div className="ass1-login__logo">
                <a href="index.html" className="ass1-logo">BraveSocial</a>
            </div>
            <div className="ass1-login__content">
                <p>Đăng nhập</p>
                <div className="ass1-login__form">
                    <form action="/api/login" method="POST" onSubmit={handleSubmitForm}>
                        <input
                            name="email"
                            type="text" className="form-control" placeholder="Email" required />
                        <input
                            name="password"
                            type="password" className="form-control" placeholder="Mật khẩu" required />

                        <div className="ass1-login__send">
                            <Link href="/register">
                                <a>Đăng ký một tài khoản</a>
                            </Link>
                            <button type="submit" className="ass1-btn">Đăng nhập</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}
export default Login