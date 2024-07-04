import {
    Paper,
    Typography,
    Stack,
    Button,
    Avatar,
    Divider,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import image1 from '../../public/black-woman-dermatologist.jpeg';
import image2 from '../../public/profile-jandu.jpg';
import image3 from '../../public/james_thompson.jpg';
import image4 from '../../public/laboratory-tester.jpg';
import '../styles/about.css';


const AboutContainer = styled(Paper)({
    padding: '3rem',
    textAlign: 'center',
    backgroundColor: '#6479E9',
    color:'white'
});

const TeamAvatar = styled(Avatar)({
    width: 80,
    height: 80,
    margin: '0.5rem',
});

const TeamSection = styled(Stack)({
    alignItems: 'center',
    justifyContent: 'center',
});

const CTAButton = styled(Button)({
    marginTop: '1rem',
});


export default function About() {
    const navigate = useNavigate();

    return (
        <>
            <div className='jumbotron' id='about-us-banner'>

            </div>
            <AboutContainer>
                <Typography variant="h3" gutterBottom>
                    About MedConnect
                </Typography>

                <Typography variant="body1" paragraph>
                    MedConnect is a leading provider of healthcare solutions, dedicated to connecting patients with top medical professionals. Our mission is to make healthcare more accessible and efficient for everyone.
                </Typography>

                <Typography variant="body1" paragraph>
                    With a team of experienced doctors, nurses, and healthcare professionals, MedConnect offers a wide range of services, from primary care to specialized treatments. We are committed to providing personalized care and ensuring the best possible outcomes for our patients.
                </Typography>

                <Divider sx={{ margin: '2rem 0' }} />

                <Typography variant="h4" gutterBottom>
                    Our Team
                </Typography>

                <TeamSection direction="row" spacing={3}>
                    <TeamAvatar src={image1} alt="Team Member 1" />
                    <TeamAvatar src={image2} alt="Team Member 2" />
                    <TeamAvatar src={image3} alt="Team Member 3" />
                    <TeamAvatar src={image4} alt='Team member 4' />
                </TeamSection>

                <Divider sx={{ margin: '2rem 0' }} />

                <Typography variant="h4" gutterBottom>
                    Contact Us
                </Typography>

                <CTAButton
                    variant="contained"
                    color="primary"
                    onClick={() => navigate('/contact')}
                >
                    Get in Touch
                </CTAButton>

            </AboutContainer>
        </>

    );
}