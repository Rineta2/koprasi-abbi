import ImageKit from "imagekit";

const imagekit = {
  publicKey: process.env.NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY as string,
  privateKey: process.env.NEXT_PUBLIC_IMAGEKIT_PRIVATE_KEY as string,
  urlEndpoint: process.env.NEXT_PUBLIC_IMGKIT_URL_ENDPOINT as string,
};

const imagekitInstance = new ImageKit(imagekit);

export default imagekitInstance;
