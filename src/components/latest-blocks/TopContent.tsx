import { Box, Grid, Typography } from "@mui/material";

import { NetworkStatus } from "api/types";

type HeaderNumberProps = {
    title: string;
    value?: string;
};

const HeaderNumber = ({ title, value }: HeaderNumberProps) => (
    <Box>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
            {title}
        </Typography>
        <Typography variant="h5">{value ? parseInt(value).toLocaleString("en-US") : ""}</Typography>
    </Box>
);

export default function TopContent({ networkStatus }: { networkStatus: NetworkStatus }) {
    return (
        <div>
            <Grid container sx={{ marginBottom: 2, marginTop: 1 }}>
                <Grid item xs={6} justifyContent="center" display="flex">
                    <HeaderNumber
                        title="Number of Blocks"
                        value={networkStatus?.localBlockHeight}
                    />
                </Grid>
                <Grid item xs={6} justifyContent="center" display="flex">
                    <HeaderNumber title="Transaction Outputs" value={networkStatus?.numTxos} />
                </Grid>
            </Grid>
            <Typography variant="h4">Latest Blocks</Typography>
        </div>
    );
}
