import React from "react"
import { RegisterProps } from "../types/types"
import { useState } from "react";
import '../styles/register.css';

export default function Form(props: RegisterProps) {
    const [name, setName] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [number, setNumber] = useState<Number>(0);
    const [password, setPassword] = useState<string>('');
    const [confirmPassword, setPasswordConfirm] = useState<string>('');

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        
    }

    return props.isRegister ? (
        <div className="container-fluid" id="register-content">
            <form action={props.url} method={props.method} onSubmit={(e) => handleSubmit(e)}>
                <div className="row">
                    <div className="col-md-6" id="register-form-content">
                        <h2>Register here</h2>
                        <div className="form-group">
                            <input type="text" className="form-control" placeholder="enter your name" onChange={(e)=>setName(e.target.value)}/>
                        </div>
                        <div className="form-group">
                            <input type="email" className="form-control" placeholder="enter your email" onChange={(e)=>setEmail(e.target.value)}/>
                        </div>
                        <div className="form-group">
                            <input type="number" className="form-control" placeholder="enter your number" onChange={(e)=>setNumber(parseInt(e.target.value))}/>
                        </div>
                        <div className="form-group">
                            <input type="password" className="form-control" placeholder="enter your password" onChange={(e)=>setPassword(e.target.value)}/>
                        </div>
                        <div className="form-group">
                            <input type="password" className="form-control" placeholder="confirm your password" onChange={(e)=>setPasswordConfirm(e.target.value)}/>
                        </div>
                        <div className="form-group">
                            <input type="button" value="Sign Up" className="form-control btn btn-custom-primary" />
                        </div>
                        <div className="form-group">
                            <h3 className="text-center"><small>Or</small></h3>
                        </div>
                        <div className="form-group">
                            <input type="button" value="Sign Up with google" className="form-control btn btn-dark" />
                        </div>
                    </div>
                    <div className="col-md-6" id="img-background">
                        
                    </div>
                </div>
            </form>
        </div>
    ) : (
        <div className="container-fluid">
            <form action={props.url} method={props.method}>
                
            </form>
        </div>
    )
}