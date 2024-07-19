import { useState } from "react"
import { instance } from "../utils/axios"
import { useNavigate } from "react-router-dom";

const SignIn = () => {

    const navigation = useNavigate();

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const onSubmit = (evt: any) => {
        evt.preventDefault();
        instance.post('login/', { email, password }).then((res: any) => {
            localStorage.setItem('access_token', res?.token?.access);
            navigation('/')
        }).catch(() => { })
    }

    return (
        <div className="container">
            <div className="form-group">
                <input
                    type='email'
                    className='form-input'
                    placeholder='Enter email here...'
                    value={email}
                    onChange={(evt) => setEmail(evt.target.value)}
                />
            </div>
            <div className="form-group">
                <input
                    type='password'
                    className='form-input'
                    placeholder='Enter pass here...'
                    value={password}
                    onChange={(evt) => setPassword(evt.target.value)}
                />
            </div>
            <button onClick={onSubmit} type="button" className='btn'>Sign In</button>
        </div>
    )
}

export default SignIn