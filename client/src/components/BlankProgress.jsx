import { Box, LinearProgress } from '@mui/material';

export default function BlankProgress() {
    return (
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Box sx={{ width: '100%' }}>
                <LinearProgress />
            </Box>
        </Box>
    );
}
