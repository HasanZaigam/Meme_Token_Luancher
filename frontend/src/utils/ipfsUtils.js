import axios from "axios";

const PINATA_JWT = import.meta.env.VITE_PINATA_JWT; // Load from .env

export const uploadToIPFS = async (file) => {
  const formData = new FormData();
  formData.append("file", file);

  const metadata = JSON.stringify({
    name: file.name,
    keyvalues: {
      description: "MemeCoin Image",
    },
  });

  formData.append("pinataMetadata", metadata);
  formData.append("pinataOptions", JSON.stringify({ cidVersion: 1 }));

  try {
    const response = await axios.post("https://api.pinata.cloud/pinning/pinFileToIPFS", formData, {
      headers: {
        Authorization: `Bearer ${PINATA_JWT}`,
        "Content-Type": "multipart/form-data",
      },
    });

    return `https://gateway.pinata.cloud/ipfs/${response.data.IpfsHash}`; // Returns IPFS URL
  } catch (error) {
    console.error("Error uploading file to IPFS:", error);
    return null;
  }
};
