import React from "react";
import axios from "axios";
import { DoctorData, DoctorsResponse } from "../../src/types/types";
import Pencil from '../../public/Pencil 1.png'
import InfoIcon from '../../public/Info.png';
import DeleteIcon from '../../public/Trash 1.png';
import { Link } from "react-router-dom";
import Modal from 'react-modal';
import $ from 'jquery';
import '../styles/dialog.css';
import { RootState } from "../../src/app/store";
import { connect } from "react-redux";
import DoctorCard from "./DoctorCardComponent";

interface DoctorListProps {
    token?: string;
    isGrid?: Boolean;
    isTable?: Boolean;
}

interface UserDetailsProps {
    isAuthenticated?: Boolean;
    userId?: number;
}

class DoctorList extends React.Component<DoctorListProps & UserDetailsProps> {
    customStyles: any;
    contentLabel: string;
    url: string;
    constructor(props: DoctorListProps & UserDetailsProps) {
        super(props);
        this.contentLabel = '';
        this.url = '';
    }

    state: Readonly<DoctorsResponse & any> = {
        data: [],
        isOpen: false,
    }

    displayDoctors = async () => {
        try {
            const response: DoctorsResponse = await axios.get('api/doctors');
            this.setState({ data: response.data });
        } catch (err) {
            console.log(err);
        }
    }

    async componentDidMount(): Promise<void> {
        this.displayDoctors();
        console.log(this.props.userId);
        this.customStyles = {
            content: {
                top: '50%',
                left: '50%',
                right: 'auto',
                bottom: 'auto',
                marginRight: '-50%',
                transform: 'translate(-50%, -50%)',
            },
        };

        Modal.setAppElement('#root');
    }

    componentWillUnmount(): void {
        this.setState({
            data: [],
            isOpen: false
        });
    }

    openModal = (contentLabel: string, e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
        e.preventDefault();
        this.setState({
            isOpen: true
        })
        this.contentLabel = contentLabel;
        this.url = $(e.currentTarget).attr('data-url') as string;

    }

    closeModal = () => {
        this.setState({
            isOpen: false
        });
        setTimeout(() => {
            this.contentLabel = '';
        }, 400)
    }

    handleDoctorDelete = async (url: string, e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();
        try {
            let data = await axios.delete(url, {
                headers: {
                    Authorization: `Bearer ${this.props.token}`
                }
            });
            console.log(data);
            this.displayDoctors();
            this.closeModal();
        } catch (err) {
            console.log(err);
        }
    }

    renderDoctorTable = () => {
        let doctorElements = this.state.data.map(({
            doctorName,
            doctorEmail,
            doctorId: docId,
            doctorSpeciality
        }: DoctorData, index: number) => {
            return (
                <tr key={index}>
                    <td>{doctorName}</td>
                    <td>{doctorEmail}</td>
                    <td>{doctorSpeciality}</td>
                    <td><Link to={`/doctor/${docId}`}><img src={InfoIcon} alt="Info" /></Link></td>
                    <td><Link to={`/doctor/edit/${docId}`}><img src={Pencil} alt="Edit" /></Link></td>
                    <td><Link onClick={(e => this.openModal(`Delete Doctor ${doctorName}?`, e))} data-url={`/api/auth/admin/doctor/delete/${docId}`} to={`#`}><img src={DeleteIcon} alt="Delete" /></Link></td>
                </tr>
            )
        })
        return doctorElements;
    }

    renderDoctorColumns = () => {
        console.log(this.state.data);
        let doctorElements = this.state.data.map(({
            doctorName,
            doctorId,
            doctorSpeciality,
            doctorProfile
        }: DoctorData, index: number) => {
            return (
                <DoctorCard
                    doctorId={doctorId}
                    doctorName={doctorName}
                    doctorSpeciality={doctorSpeciality}
                    profilePath={doctorProfile}
                    key={index}
                    isGrid={true}
                />
            )
        })
        return doctorElements;
    }

    modalElement = () => {
        return (
            <div className="container text-center">
                <h2><small>{this.contentLabel}</small></h2>
                <button onClick={(e => this.handleDoctorDelete(this.url, e))} type="button" className="btn btn-lg btn-danger">Confirm</button>
                <button onClick={this.closeModal} type="button" className="btn btn-lg btn-light">Cancel</button>
            </div>
        )
    }

    render(): React.ReactNode {
        return (
            <>
                {this.props.isGrid &&
                    <>
                        {this.renderDoctorColumns()}
                    </>
                }

                {this.props.isTable &&
                    <>
                        <Modal
                            closeTimeoutMS={400}
                            isOpen={this.state.isOpen}
                            onRequestClose={this.closeModal}
                            style={this.customStyles}
                            contentLabel={this.contentLabel}
                            contentElement={this.modalElement}
                        >

                        </Modal>
                        {this.renderDoctorTable()}
                    </>

                }

            </>
        );
    }
}

const mapStateToProps = (state: RootState) => {
    return {
        userId: state.userId,
        isAuthenticated: state.isAuthenticated
    }
};

export default connect(mapStateToProps)(DoctorList);