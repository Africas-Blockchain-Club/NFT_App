import pinataSDK from '@pinata/sdk';
import fs from 'fs';
import path from 'path';

const pinata = new pinataSDK({
  pinataApiKey: 'your-pinata-api-key',
  pinataSecretApiKey: 'your-pinata-secret-api-key'
});

const IMAGES_DIR = './charity-images';

async function uploadDirectoryToPinata(): Promise<void> {
  try {
    console.log('Uploading directory to Pinata...');
    
    const result = await pinata.pinFromFS(IMAGES_DIR);
    console.log('Upload successful!');
    console.log('IPFS Hash:', result.IpfsHash);
    
    // If you need individual file hashes, you might need to use the pinFileToIPFS method
    // for each file instead
  } catch (error) {
    console.error('Error uploading to Pinata:', error);
  }
}

// Execute the upload
uploadDirectoryToPinata();