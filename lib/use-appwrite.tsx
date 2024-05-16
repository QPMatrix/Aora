import { useState, useEffect } from "react";
import { Alert } from "react-native";
import { Models } from "react-native-appwrite";
type FetchFunction = () => Promise<Models.DocumentList<Models.Document>>;

const useAppwrite = (fn: FetchFunction) => {
  const [data, setData] = useState<Models.Document[]>([]);
  const [loading, setLoading] = useState(true);
  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await fn();
      setData(res.documents);
    } catch (error: any) {
      Alert.alert("Error", error.message);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);
  const refetch = () => fetchData();
  return { data, refetch, loading };
};
export default useAppwrite;
