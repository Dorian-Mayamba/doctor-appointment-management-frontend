import React, { useState } from 'react';
import {
  Paper,
  Typography,
  TextField,
  Button,
  Stack,
  IconButton,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import axios from 'axios';


const ContactContainer = styled(Paper)({
    padding: '3rem',
    textAlign: 'center',
    backgroundColor: '#6479E9',
    margin: 'auto',
    width: '80%',
    color:'white'
  });
  
  const ContactField = styled(TextField)({
    margin: '1rem 0',
    "::placeholder":{
        color:'white'
    }
  });
  
  const ContactButton = styled(Button)({
    marginTop: '1.5rem',
  });
  
  const IconWrapper = styled(IconButton)({
    marginRight: '0.5rem',
  });
  

  const Contact = () => {
    const [contactName, setContactName] = useState('');
    const [contactEmail, setContactEmail] = useState('');
    const [contactMessage, setContactMessage] = useState('');
  
    const handleSubmit = async () => {
      if (contactName === '' || contactEmail === '' || contactMessage === '') {
        return; // Validate fields
      }
  
      const contactData = {
        name: contactName,
        email: contactEmail,
        message: contactMessage,
      };
  
      try {
        const response = await axios.post('/api/contact', contactData);
  
        if (response.status === 200) {
          console.log('Contact form submitted successfully');
          setContactName('');
          setContactEmail('');
          setContactMessage('');
        }
      } catch (error) {
        console.error('Error submitting contact form:', error);
      }
    };
  
    return (
      <ContactContainer>
        <Typography variant="h3" gutterBottom>
          Contact Us
        </Typography>
  
        <Typography variant="body1" paragraph>
          We'd love to hear from you! If you have any questions, comments, or concerns, please use the form below to get in touch with us.
        </Typography>
  
        <Stack direction="column" alignItems="center">
          <ContactField
            label="Your Name"
            variant="outlined"
            fullWidth
            value={contactName}
            onChange={(e) => setContactName(e.target.value)}
          />
  
          <ContactField
            label="Your Email"
            type="email"
            variant="outlined"
            fullWidth
            value={contactEmail}
            onChange={(e) => setContactEmail(e.target.value)}
          />
  
          <ContactField
            label="Your Message"
            multiline
            rows={4}
            variant="outlined"
            fullWidth
            value={contactMessage}
            onChange={(e) => setContactMessage(e.target.value)}
          />
        </Stack>
  
        <ContactButton variant="contained" color="primary" onClick={handleSubmit}>
          Send Message
        </ContactButton>
  
        <Typography variant="h4" gutterBottom sx={{ marginTop: '2rem' }}>
          Contact Information
        </Typography>
  
        <Stack direction="row" spacing={3} alignItems="center" justifyContent="center">
          <IconWrapper>
            <EmailIcon />
          </IconWrapper>
          <Typography variant="body1">contact@medconnect.com</Typography>
  
          <IconWrapper>
            <PhoneIcon />
          </IconWrapper>
          <Typography variant="body1">(123) 456-7890</Typography>
  
          <IconWrapper>
            <LocationOnIcon />
          </IconWrapper>
          <Typography variant="body1">123 Main St, City, State, ZIP</Typography>
        </Stack>
      </ContactContainer>
    );
  };
  
  export default Contact;
  