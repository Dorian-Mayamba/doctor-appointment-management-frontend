import Form from "../components/Form"
export default function SignUp(){
    return (
        <div className="container-fluid">
            <Form url="api/auth/register" method="POST" isRegister={true} isLogin={false}/>
        </div>
    )
}