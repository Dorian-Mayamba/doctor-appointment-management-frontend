import Form from "../components/Form"
export default function SignIn() {
    return (
        <Form isLogin={true} isRegister={false} url="api/auth/login" method="POST" />
    )
}