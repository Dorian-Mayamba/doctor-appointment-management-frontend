import Form from "../components/Form"
export default function SignIn(){
    return(
        <div className="container">
            <Form isLogin={true} isRegister={false} url="api/auth/login" method="POST"/>
        </div>
    )
}