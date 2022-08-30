import { useMemo, useState } from "react"
import { handleError } from "../helpers"
import Cookies from "js-cookie"
import { useGlobalState } from "../states"
import { useNotAuthen } from "../helpers/useAuthen"
import userService from "../service/userService"

const initRegisterData = {
    fullname: {
        value: "",
        error: ""
    },
    email: {
        value: "",
        error: ""
    },
    password: {
        value: "",
        error: ""
    },
    repassword: {
        value: "",
        error: ""
    }
}

export default function Register() {
    useNotAuthen()
    const [registerData, setRegisterData] = useState(initRegisterData)
    const [, setToken] = useGlobalState("token")
    const [, setUserInfo] = useGlobalState("currentUser")

    const isValidate = useMemo((): boolean => {
        for (let key in registerData) {
            const error = registerData[key].error
            if (error !== '') return false
        }
        return true
    }, [registerData])

    const onChangeData = (key: string) => (e: any) => {
        const value = e.target.value
        const password = registerData.password.value
        const error = handleError(key, value, password)
        setRegisterData({
            ...registerData,
            [key]: {
                value,
                error
            }
        })
    }

    const handleRegister = (e) => {
        e.preventDefault()
        if (!(isValidate)) {
            alert("Your input is wrong format!")
            return
        }
        const email = registerData.email.value
        const password = registerData.password.value
        const fullname = registerData.fullname.value
        const repassword = registerData.repassword.value

        const dataInput = {
            email, fullname, password, repassword
        }

        userService.register(dataInput)
            .then(res => {
                if (res.status === 200) {
                    console.log(res);
                    setToken(res.token)
                    setUserInfo(res.user)
                    Cookies.set("token", res.token, { expires: 1 })
                } else {
                    alert(res.error)
                }
            })
    }

    return (
        <div className="ass1-login">
            <div className="ass1-login__logo">
                <a href="index.html" className="ass1-logo">Social Media</a>
            </div>
            <div className="ass1-login__content">
                <p>Đăng ký một tài khoản</p>
                <div className="ass1-login__form">
                    <form action="#" onSubmit={handleRegister}>
                        <div className="form-group">
                            <input
                                value={registerData.fullname.value}
                                onChange={onChangeData('fullname')}
                                type="text" className="form-control" placeholder="Tên hiển thị" required />
                            {
                                registerData.fullname.error
                                &&
                                <small className="form-text text-danger">{registerData.fullname.error}</small>
                            }
                        </div>
                        <div className="form-group">
                            <input
                                value={registerData.email.value}
                                onChange={onChangeData('email')}
                                type="email" className="form-control" placeholder="Email" required />

                            {
                                registerData.email.error
                                &&
                                <small className="form-text text-danger">{registerData.email.error}</small>
                            }
                        </div>
                        <div className="form-group">
                            <input
                                value={registerData.password.value}
                                onChange={onChangeData('password')}
                                type="password" className="form-control" placeholder="Mật khẩu" required />
                            {
                                registerData.password.error
                                &&
                                <small className="form-text text-danger">{registerData.password.error}</small>
                            }
                        </div>
                        <div className="form-group">
                            <input
                                value={registerData.repassword.value}
                                onChange={onChangeData('repassword')}
                                type="password" className="form-control" placeholder="Nhập lại mật khẩu" required />
                            {
                                registerData.repassword.error
                                &&
                                <small className="form-text text-danger">{registerData.repassword.error}</small>
                            }
                        </div>
                        <div className="ass1-login__send">
                            <a href="dang-nhap.html">Đăng nhập</a>
                            <button type="submit" className="ass1-btn">Đăng ký</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}