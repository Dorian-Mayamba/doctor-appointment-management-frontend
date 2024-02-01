import Form from "../components/Form"
export default function SignUp() {
    return (
        <Form url="api/auth/register" method="POST" isRegister={true} isLogin={false} />
    )
}