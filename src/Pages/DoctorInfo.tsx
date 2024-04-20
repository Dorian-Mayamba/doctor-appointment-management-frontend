import { useParams } from "react-router";
import axios from 'axios';
import { DoctorData } from "../../src/types/types";
import { useState, useEffect } from "react";
import DoctorCard from "../../src/components/DoctorCardComponent";
import Sidebar from "../../src/components/SideBar";
import { Grid } from "@mui/material";

export default function DoctorInfo() {
    const { doctorId } = useParams();
    const [doctor, setDoctor] = useState<DoctorData>();

    const loadDoctor = async (doctorId: string | number | undefined) => {
        try {
            let response = await axios.get(`/api/doctor/${doctorId}`);
            let data = await response.data;
            setDoctor(data);
        } catch (err) {
            alert("an error has occured");
            console.log(err);
        }
    }

    useEffect(() => {
        loadDoctor(doctorId);
    }, [])

    return (
        <Grid container columnSpacing={{ xs: 1, sm: 2, md: 2 }}>
            <Grid sx={{ bgcolor: '#6479E9', p:1 }} item xs={12} sm={4} md={2}>
                <Sidebar />
            </Grid>
            <Grid sx={{ bgcolor: '#D5FEFE' }} item xs={12} sm={8} md={10}>
            {doctor && <>
                <DoctorCard
                    doctorId={parseInt(doctorId as string)}
                    doctorName={doctor.doctorName}
                    profilePath={doctor.doctorProfile}
                    doctorSpeciality={doctor.doctorSpeciality}
                    averageRating={doctor.averageRating}
                    ratings={doctor.ratings}
                    reviews={doctor.reviews}
                    isInfo={true}
                />
            </>}
            </Grid>
        </Grid>
    )


}