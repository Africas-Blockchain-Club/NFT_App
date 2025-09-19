const axios = require('axios');
const fs = require('fs');
const FormData = require('form-data');
const path = require('path');

// Your Pinata API credentials
const PINATA_API_KEY = 'your-pinata-api-key';
const PINATA_SECRET_API_KEY = 'your-pinata-secret-api-key';

// Directory containing your images
const IMAGES_DIR = './charity-images';

async function uploadToPinata(filePath) {
    const url = `https://api.pinata.cloud/pinning/pinFileToIPFS`;
    
    let data = new FormData();
    data.append('file', fs.createReadStream(filePath));
    
    const response = await axios.post(url, data, {
        maxContentLength: 'Infinity',
        headers: {
            'Content-Type': `multipart/form-data; boundary=${data._boundary}`,
            'pinata_api_key': PINATA_API_KEY,
            'pinata_secret_api_key': PINATA_SECRET_API_KEY
        }
    });
    
    return response.data;
}

async function uploadAllImages() {
    try {
        const files = fs.readdirSync(IMAGES_DIR);
        
        for (const file of files) {
            if (file.endsWith('.jpg') || file.endsWith('.png')) {
                const filePath = path.join(IMAGES_DIR, file);
                console.log(`Uploading ${file}...`);
                
                const result = await uploadToPinata(filePath);
                console.log(`Uploaded: ${result.IpfsHash}`);
                
                // Save the hash to a JSON file for later reference
                fs.appendFileSync('./ipfs-hashes.json', 
                    JSON.stringify({ file, ipfsHash: result.IpfsHash }) + ',\n');
            }
        }
        
        console.log('All files uploaded successfully!');
    } catch (error) {
        console.error('Error uploading files:', error);
    }
}

uploadAllImages();