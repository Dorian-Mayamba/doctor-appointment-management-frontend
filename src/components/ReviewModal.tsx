import { Modal, Box, Typography, TextField, Button, Rating } from '@mui/material';

const ReviewModal = ({ isOpen, handleClose, doctorName, submitReview, reviewText, setReviewText, reviewRating, setReviewRating }: any) => (
  <Modal
    open={isOpen}
    onClose={handleClose}
    aria-labelledby="review-modal-title"
    aria-describedby="review-modal-description"
  >
    <Box
      sx={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        boxShadow: 24,
        p: 4,
      }}
    >
      <Typography variant="h6" id="review-modal-title">
        Leave a Review for Dr. {doctorName}
      </Typography>
      <TextField
        label="Your Review"
        multiline
        rows={4}
        variant="outlined"
        fullWidth
        value={reviewText}
        onChange={(e) => setReviewText(e.target.value)}
      />
      <Rating
        name="user-rating"
        value={reviewRating}
        precision={0.5}
        onChange={(e, newValue) => {
          setReviewRating(newValue);
          console.log(reviewRating);
        }}
      />
      <Box className="btn-box">
        <Button variant="contained" onClick={submitReview} sx={{ mt: 2 }}>
          Submit
        </Button>
      </Box>
    </Box>
  </Modal>
);

export default ReviewModal;
