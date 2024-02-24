import React from "react";
import { SPECIALITIES } from "../../src/constants/constants";
import { Link } from "react-router-dom";

interface SpecialityProps {
    specialities: string[];
}

interface ComponentTypeProps {
    isList: Boolean;
    isSelect: Boolean;
    speciality?: string;
}

export default class SpecialityList extends React.Component<ComponentTypeProps> {

    constructor(props: ComponentTypeProps) {
        super(props);
    }

    state: Readonly<SpecialityProps> = {
        specialities: []
    }

    componentDidMount(): void {
        if (this.props.speciality) {
            let filterSpecialities = SPECIALITIES.filter(specialilty => specialilty !== this.props.speciality);
            console.log(filterSpecialities);
            this.setState({
                specialilties: filterSpecialities.map((spec, index) => {
                    return (
                        <option key={index} value={spec}>{spec}</option>
                    )
                })
            });
        } else {
            this.setState({
                specialities: SPECIALITIES.map((speciality, index) => {
                    return (
                        this.props.isList ?
                            <Link className="list-group-item list-group-item-action" key={index} to='#'>{speciality}</Link>
                            : <option key={index} value={speciality}>{speciality}</option>
                    )
                })
            });
        }

    }

    componentWillUnmount(): void {
        this.setState({
            specialities:[]
        });
    }

    render(): React.ReactNode {
        return (
            this.state.specialities
        )
    }

}