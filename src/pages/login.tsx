import { useRouter } from "next/router"
import { useState } from "react"

interface FormLogin {
    email: string,
    password: string
}

const initFormData: FormLogin = {
    email: '',
    password: ''
}

const Login = () => {
    const [formData, setFormData] = useState(initFormData)
    const router = useRouter()

    const handleOnChange = (key: string) => (e: any) => {
        const value = e.target.value
        setFormData({
            ...formData,
            [key]: value
        })
    }
    const handleSubmit = (e) => {
        e.preventDefault()
        const body = JSON.stringify(formData)
        const method = "POST"
        // api.callJson('/member/login.php', config)
        //     .then(data => {
        //         console.log(data);
        //     })
        fetch('/api/login', {
            body,
            method,
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then(res => res.json())
            .then(data => {
                // router.push('/')
                console.log(data);
            })
    }

    return (
        <div className="ass1-login">
            <div className="ass1-login__logo">
                <a href="index.html" className="ass1-logo">BraveSocial</a>
            </div>
            <div className="ass1-login__content">
                <p>Đăng nhập</p>
                <div className="ass1-login__form">
                    <form action="#" onSubmit={handleSubmit}>
                        <input
                            value={formData.email}
                            onChange={handleOnChange('email')}
                            type="text" className="form-control" placeholder="Email" required />
                        <input
                            value={formData.password}
                            onChange={handleOnChange('password')}
                            type="password" className="form-control" placeholder="Mật khẩu" required />

                        <div className="ass1-login__send">
                            <a href="dang-ky.html">Đăng ký một tài khoản</a>
                            <button type="submit" className="ass1-btn">Đăng nhập</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}
export default Login