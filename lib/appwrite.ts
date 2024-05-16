import {
  Account,
  Avatars,
  Client,
  Databases,
  ID,
  Query,
} from "react-native-appwrite";

export const config = {
  endpoint: process.env.EXPO_PUBLIC_APPWRITE_ENDPOINT,
  platform: "tech.qpmatrix.aora",
  projectId: process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID,
  databaseId: process.env.EXPO_PUBLIC_APPWRITE_DATABASE_ID,
  userCollectionId: process.env.EXPO_PUBLIC_APPWRITE_USERS_COLLECTION_ID,
  videoCollectionId: process.env.EXPO_PUBLIC_APPWRITE_VIDEO_COLLECTION_ID,
  storageId: process.env.EXPO_PUBLIC_APPWRITE_STORAGE_ID,
};
const client = new Client();
client
  .setEndpoint(config.endpoint!)
  .setProject(config.projectId!)
  .setPlatform(config.platform!);
const account = new Account(client);
const avatars = new Avatars(client);
const databases = new Databases(client);
export const createUser = async (
  email: string,
  password: string,
  username: string
) => {
  try {
    const newAccount = await account.create(
      ID.unique(),
      email,
      password,
      username
    );
    if (!newAccount) throw new Error("User not created");
    const avatarUrl = avatars.getInitials(username);
    console.log(newAccount.$id);
    await signIn(email, password);
    const newUser = await databases.createDocument(
      config.databaseId!,
      config.userCollectionId!,
      ID.unique(),
      {
        accountId: newAccount.$id,
        email: email,
        username: username,
        avatar: avatarUrl,
      }
    );
    if (!newUser) throw new Error("User not created");
    console.log(newUser);
    return newUser;
  } catch (error: any) {
    console.error(error);
    throw new Error(error);
  }
};
export const signIn = async (email: string, password: string) => {
  try {
    const session = await account.createEmailPasswordSession(email, password);
    return session;
  } catch (error: any) {
    console.error(error);
    throw new Error(error);
  }
};
export const getCurrentUser = async () => {
  try {
    const currentAccount = await account.get();
    if (!currentAccount) throw new Error("Account not found");
    const currentUser = await databases.listDocuments(
      config.databaseId!,
      config.userCollectionId!,
      [Query.equal("accountId", currentAccount.$id)]
    );
    if (!currentUser) throw new Error("User not found");
    return currentUser.documents[0];
  } catch (error) {
    console.log(error);
  }
};
export const getAllPosts = async () => {
  try {
    const posts = await databases.listDocuments(
      config.databaseId!,
      config.videoCollectionId!
    );

    return posts;
  } catch (error: any) {
    throw new Error(error);
  }
};
export const getLatsPosts = async () => {
  try {
    const posts = await databases.listDocuments(
      config.databaseId!,
      config.videoCollectionId!,
      [Query.orderDesc("$createdAt"), Query.limit(7)]
    );

    return posts;
  } catch (error: any) {
    throw new Error(error);
  }
};
export const searchPosts = async (query: string) => {
  try {
    const posts = await databases.listDocuments(
      config.databaseId!,
      config.videoCollectionId!,
      [Query.search("title", query)]
    );
    return posts;
  } catch (error: any) {
    console.log(error);
    throw new Error(error);
  }
};
