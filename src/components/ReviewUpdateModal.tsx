import { Modal, Box, Typography, TextField, Button, Rating } from '@mui/material';

const ReviewUpdateModal = ({ isOpen, handleClose, doctorName, updateReview, reviewText, setReviewText, reviewRating, setReviewRating }: any) => (
    <Modal
        open={isOpen}
        onClose={handleClose}
        aria-labelledby="review-update-modal-title"
        aria-describedby="review-update-modal-description"
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
            <Typography variant="h6" id="review-update-modal-title">
                Update Review for Dr. {doctorName}
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
                }}
            />
            <Box>
                <Button variant="contained" onClick={updateReview} sx={{ mt: 2 }}>
                    Update
                </Button>
            </Box>
        </Box>
    </Modal>
);

export default ReviewUpdateModal;
