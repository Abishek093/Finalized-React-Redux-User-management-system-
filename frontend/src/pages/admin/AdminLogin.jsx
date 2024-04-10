import { useState, useEffect } from "react"
import { FaSignInAlt } from "react-icons/fa"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { toast } from 'react-toastify'
import { login } from '../../features/admin/adminSlice'
import Spinner from "../../components/Spinner"
import '../pageStyle.css';

function AdminLogin() {
    const [adminData, setAdminData] = useState({
        email: '',
        password: '',
    })

    const [errors,setErrors] = useState({})

    const { email, password } = adminData

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const { admin, isLoading, isError, isSuccess, message } = useSelector((state) => state.adminAuth)

    useEffect(() => {
        if (isError) {
            toast.error(message)
        }
        if (isSuccess || admin) {
            navigate('/admin/dashboard')
        }
        if (isLoading) {
            return <Spinner />
        }

        // dispatch(reset())
    }, [admin, isError, isSuccess, message, navigate, dispatch])

    const onChange = (e) => {
        setAdminData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }))
    }

    const onSubmit = (e) => {
        e.preventDefault()

        let validationErrors = {};

        //email validation
        if(!email || !/^\S+@\S+\.\S+$/.test(email)){
            validationErrors.email = 'Please enter a valid email address';
        }

        //password validation
        if (!password || password.length < 6) {
            validationErrors.password = 'Password must be at least 6 characters long';
        }

        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        const adminCred = {
            email,
            password
        }

        console.log("001",email, password);
        dispatch(login(adminCred))
    }

    // if (isLoading) {
    //     return <Spinner />
    // }
    return (
        <>

            <section className="heading">
                <h1>
                    <FaSignInAlt /> Login
                </h1>
                <p>Login Admin</p>
            </section>

            <section className="form">
                <form onSubmit={onSubmit}>

                    <div className="form-group">
                        <input type="email" className="form-control"
                            id="email"
                            name="email"
                            value={email}
                            placeholder="Enter your email"
                            onChange={onChange} />
                            {errors.email&& <div className="error-message">{errors.email}</div>}
                    </div>
                    <div className="form-group">
                        <input type="password" className="form-control"
                            id="password"
                            name="password"
                            value={password}
                            placeholder="Enter password"
                            onChange={onChange} />
                            {errors.password&&<div className="error-message">{errors.password}</div>}
                    </div>

                    <div className="form-group">
                        <button type="submit" className="btn btn-block">Submit</button>
                    </div>
                </form>
            </section>

        </>
    )
}

export default AdminLogin
