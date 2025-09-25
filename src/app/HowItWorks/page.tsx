import React from 'react';
import { Card, Grid, Container, Typography, Box, Stepper, Step, StepLabel, Paper, Chip } from '@mui/material';
import { styled } from '@mui/material/styles';
import { Favorite, TrendingUp, HowToVote, Payment, Visibility, Security, Groups } from '@mui/icons-material';

const StyledCard = styled(Card)(({ theme }) => ({
  padding: theme.spacing(4),
  marginBottom: theme.spacing(4),
  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
  color: 'white',
}));

const FeatureCard = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  height: '100%',
  transition: 'transform 0.2s',
  '&:hover': {
    transform: 'translateY(-4px)',
    boxShadow: theme.shadows[4],
  },
}));

const steps = [
  'Charity Nomination',
  'Community Voting',
  'NFT Minting',
  'Fund Distribution',
  'Transparent Tracking',
];

const HowItWorks: React.FC = () => {
  return (
    <Container maxWidth="lg" sx={{ py: 8 }}>
      {/* Hero Section */}
      <StyledCard elevation={6}>
        <Typography variant="h2" component="h1" gutterBottom align="center" fontWeight="bold">
          💫 NFT Charity Platform
        </Typography>
        <Typography variant="h5" align="center" sx={{ opacity: 0.9 }}>
          Transforming NFT purchases into real-world impact through decentralized governance
        </Typography>
      </StyledCard>

      {/* Process Overview */}
      <Box sx={{ mb: 8 }}>
        <Typography variant="h4" component="h2" gutterBottom align="center" color="primary" fontWeight="bold">
          How It Works
        </Typography>
        <Stepper alternativeLabel sx={{ mt: 4 }}>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
      </Box>

      {/* Detailed Process */}
      <Grid container spacing={4}>
        {/* Step 1: Charity Nomination */}
        <Grid item xs={12} md={6}>
          <FeatureCard elevation={2}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <Groups color="primary" sx={{ fontSize: 40, mr: 2 }} />
              <Typography variant="h5" fontWeight="bold">1. Charity Nomination</Typography>
            </Box>
            <Typography variant="body1" color="text.secondary">
              Charities are nominated by our community and verified through a rigorous due diligence process. 
              Any reputable organization can be proposed for consideration.
            </Typography>
            <Box sx={{ mt: 2 }}>
              <Chip label="Community-Driven" variant="outlined" sx={{ mr: 1, mb: 1 }} />
              <Chip label="Verified Organizations" variant="outlined" />
            </Box>
          </FeatureCard>
        </Grid>

        {/* Step 2: Token Holder Voting */}
        <Grid item xs={12} md={6}>
          <FeatureCard elevation={2}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <HowToVote color="primary" sx={{ fontSize: 40, mr: 2 }} />
              <Typography variant="h5" fontWeight="bold">2. Democratic Voting</Typography>
            </Box>
            <Typography variant="body1" color="text.secondary">
              Our token holders participate in governance votes to select which charities receive funding. 
              Voting power is proportional to token holdings, ensuring fair representation.
            </Typography>
            <Box sx={{ mt: 2 }}>
              <Chip label="Token-Based Voting" variant="outlined" sx={{ mr: 1, mb: 1 }} />
              <Chip label="Transparent Results" variant="outlined" />
            </Box>
          </FeatureCard>
        </Grid>

        {/* Step 3: NFT Purchase */}
        <Grid item xs={12} md={6}>
          <FeatureCard elevation={2}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <Payment color="primary" sx={{ fontSize: 40, mr: 2 }} />
              <Typography variant="h5" fontWeight="bold">3. NFT Purchase</Typography>
            </Box>
            <Typography variant="body1" color="text.secondary">
              Purchase NFTs representing your chosen charity. 100% of proceeds go directly to the charity's 
              on-chain treasury. Each NFT is a unique digital collectible representing your contribution.
            </Typography>
            <Box sx={{ mt: 2 }}>
              <Chip label="100% to Charity" variant="outlined" sx={{ mr: 1, mb: 1 }} />
              <Chip label="Unique Collectibles" variant="outlined" />
            </Box>
          </FeatureCard>
        </Grid>

        {/* Step 4: Fund Management */}
        <Grid item xs={12} md={6}>
          <FeatureCard elevation={2}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <Security color="primary" sx={{ fontSize: 40, mr: 2 }} />
              <Typography variant="h5" fontWeight="bold">4. Secure Fund Management</Typography>
            </Box>
            <Typography variant="body1" color="text.secondary">
              Funds are held in secure, transparent smart contracts on the blockchain. Charities receive 
              funds through governed proposals, ensuring proper allocation and usage.
            </Typography>
            <Box sx={{ mt: 2 }}>
              <Chip label="Smart Contract Managed" variant="outlined" sx={{ mr: 1, mb: 1 }} />
              <Chip label="Multi-Sig Security" variant="outlined" />
            </Box>
          </FeatureCard>
        </Grid>

        {/* Step 5: Transparency */}
        <Grid item xs={12}>
          <FeatureCard elevation={2}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <Visibility color="primary" sx={{ fontSize: 40, mr: 2 }} />
              <Typography variant="h5" fontWeight="bold">5. Complete Transparency</Typography>
            </Box>
            <Typography variant="body1" color="text.secondary">
              Track every dollar in real-time. Our platform provides transparent reporting on how funds are 
              spent, with on-chain verification of all transactions and regular impact reports.
            </Typography>
            <Box sx={{ mt: 2 }}>
              <Chip label="Real-Time Tracking" variant="outlined" sx={{ mr: 1, mb: 1 }} />
              <Chip label="On-Chain Verification" variant="outlined" />
              <Chip label="Impact Reporting" variant="outlined" />
            </Box>
          </FeatureCard>
        </Grid>
      </Grid>

      {/* Benefits Section */}
      <Box sx={{ mt: 8, p: 4, bgcolor: 'background.default', borderRadius: 2 }}>
        <Typography variant="h4" component="h2" gutterBottom align="center" color="primary">
          Why Choose Our Platform?
        </Typography>
        <Grid container spacing={3} sx={{ mt: 2 }}>
          <Grid item xs={12} md={4}>
            <Box textAlign="center">
              <Favorite sx={{ fontSize: 60, color: 'primary.main', mb: 2 }} />
              <Typography variant="h6" gutterBottom>Maximum Impact</Typography>
              <Typography variant="body2" color="text.secondary">
                100% of NFT proceeds go to charities with minimal operational costs through blockchain efficiency
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} md={4}>
            <Box textAlign="center">
              <HowToVote sx={{ fontSize: 60, color: 'primary.main', mb: 2 }} />
              <Typography variant="h6" gutterBottom>Community Governed</Typography>
              <Typography variant="body2" color="text.secondary">
                Token holders decide which charities receive funding through transparent voting mechanisms
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} md={4}>
            <Box textAlign="center">
              <Visibility sx={{ fontSize: 60, color: 'primary.main', mb: 2 }} />
              <Typography variant="h6" gutterBottom>Complete Transparency</Typography>
              <Typography variant="body2" color="text.secondary">
                Track donations from purchase to impact with full on-chain visibility and regular audits
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Box>

      {/* Call to Action */}
      <Box sx={{ mt: 6, textAlign: 'center' }}>
        <Typography variant="h6" gutterBottom color="text.secondary">
          Ready to make a difference?
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Join our community of donors and help shape the future of charitable giving through blockchain technology.
        </Typography>
      </Box>
    </Container>
  );
};

export default HowItWorks;