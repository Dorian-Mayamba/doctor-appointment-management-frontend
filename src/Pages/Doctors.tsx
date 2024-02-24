import SpecialityList from "../../src/components/SpecialityList"
import { Link } from "react-router-dom"
import '../styles/Doctors.css'
export default function Doctors(){
    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-3">
                    <div className="list-group">
                        <Link className="list-group-item list-group-item-action" to='#'>Default</Link>
                        <SpecialityList isList={true} isSelect={false}/>
                    </div>
                </div>
                <div className="col-md-9">
                    <h2 className="text-center p-3"><small>Find a Doctor</small></h2>
                </div>
            </div>
        </div>
    )
}