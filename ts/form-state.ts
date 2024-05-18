import { ImagePickerAsset } from "expo-image-picker";
export type FormState = {
  title: string;
  description: string;
  video: ImagePickerAsset | null;
  thumbnail: ImagePickerAsset | null;
  prompt: string;
  userId?: string;
};
