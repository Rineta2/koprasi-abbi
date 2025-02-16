import ImageKit from "imagekit";

const imagekit = {
  publicKey: process.env.NEXT_PUBLIC_PUBLIC_KEY_IMGKIT as string,
  privateKey: process.env.NEXT_PUBLIC_PRIVATE_KEY_IMGKIT as string,
  urlEndpoint: process.env.NEXT_PUBLIC_URL_ENDPOINT_IMGKIT as string,
};

const imagekitInstance = new ImageKit(imagekit);

export default imagekitInstance;
