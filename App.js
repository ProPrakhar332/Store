import { StatusBar } from "expo-status-bar";
import { useEffect, useState, useCallback } from "react";
import {
  StyleSheet,
  Text,
  Image,
  View,
  SafeAreaView,
  FlatList,
  ActivityIndicator,
  useWindowDimensions,
  TouchableOpacity,
} from "react-native";
import axios from "axios";
import * as Font from "expo-font";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import Feather from "react-native-vector-icons/Feather";
import Octicons from "react-native-vector-icons/Octicons";
import {
  Poppins_500Medium,
  Poppins_700Bold,
  Poppins_800ExtraBold,
} from "@expo-google-fonts/poppins";
export default function App() {
  const [mainData, setMainData] = useState([]);
  const [page, setpage] = useState(1);
  const [showLoader, setshowLoader] = useState(true);
  const layout = useWindowDimensions();

  useEffect(() => {
    async function loadFonts() {
      await Font.loadAsync({
        Poppins_500Medium: Poppins_500Medium,
        Poppins_700Bold: Poppins_700Bold,
        Poppins_800ExtraBold: Poppins_800ExtraBold,
      })
        .then((response) => {
          console.log(response);
        })
        .catch((err) => {
          console.log(err);
        });
    }
    loadFonts();
    loadDefaultData();
  }, []);

  useEffect(() => {
    console.log(mainData.length);
  }, [mainData]);

  const loadDefaultData = async () => {
    let url = `https://storeapi.wekreta.in/api/v4/product/customer?id=0&secondaryKey=3d70712a-26fb-11ee-b277-029ff3b26cce&productName=&categoryName=serveware,kitchenware&subCategoryName=&subSubCategoryName=&brandName=&isFeatured=0&search=&currentPage=${page}&itemsPerPage=20&sortBy=createdDate&sortOrder=desc&isFetchListing=0&searchTag=&storeUuid=cb910d4a-bf60-11ed-814d-0252190a7100`;

    await axios
      .get(url)
      .then((result) => {
        console.log(url);
        setMainData(result.data.object);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const loadMoreData = async () => {
    let next = page + 1;
    let url = `https://storeapi.wekreta.in/api/v4/product/customer?id=0&secondaryKey=3d70712a-26fb-11ee-b277-029ff3b26cce&productName=&categoryName=serveware,kitchenware&subCategoryName=&subSubCategoryName=&brandName=&isFeatured=0&search=&currentPage=${next}&itemsPerPage=20&sortBy=createdDate&sortOrder=desc&isFetchListing=0&searchTag=&storeUuid=cb910d4a-bf60-11ed-814d-0252190a7100`;

    await axios
      .get(url)
      .then((result) => {
        if (result.data.object.length < 20) {
          console.log(url);
          setMainData([...mainData, ...result.data.object]);
          setshowLoader(false);
        } else {
          setMainData([...mainData, ...result.data.object]);
          setpage(next);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const renderCard = ({ item }) => {
    return (
      <View
        key={item.id}
        style={{
          alignItems: "center",
          width: layout.width / 2.1,
          height: layout.width / 2.1 + 100,

          margin: 3,
        }}
      >
        <Image
          source={{ uri: item.mediaUrl }}
          style={{
            width: layout.width / 2.1,
            height: layout.width / 2.1,
            borderRadius: 5,
            resizeMode: "contain",
          }}
        />
        <View
          style={{
            flexDirection: "column",
            alignSelf: "flex-start",
            height: 90,
            justifyContent: "space-evenly",
          }}
        >
          <Text style={[styles.text, { fontWeight: "bold" }]}>{item.name}</Text>
          <Text style={[styles.text, {}]}>{item.category[0].name}</Text>
          <Text style={[styles.text, {}]}>
            ₹{item.variants[0].sellingPrice}
          </Text>
        </View>
        <TouchableOpacity
          style={{ position: "absolute", top: 0, right: 0, margin: 10 }}
        >
          <FontAwesome5 name="heart" size={25} color={"black"} />
        </TouchableOpacity>
        {item.promotionalTag != null ? (
          <View
            style={{
              position: "absolute",
              top: 147.5,
              left: 7.5,
            }}
          >
            <Text
              style={{
                color: "white",
                backgroundColor: "black",
                padding: 5,
                paddingHorizontal: 10,
                borderRadius: 5,
              }}
            >
              {item.promotionalTag}
            </Text>
          </View>
        ) : null}
      </View>
    );
  };
  const renderLoader = () => {
    return (
      <View style={{ marginVertical: 10 }}>
        <ActivityIndicator size="large" color={"#062CBD"} />
      </View>
    );
  };

  return (
    <SafeAreaView
      style={styles.container}
      // onLayout={handleOnLayout}
    >
      <View style={{ marginTop: 20 }}>
        {/* Header */}
        <View
          style={{
            flexDirection: "row",
            width: "100%",
            //justifyContent: "space-between",
            backgroundColor: "white",
            padding: 10,
            borderBottomWidth: 1,
            borderBottomColor: "gray",
          }}
        >
          <TouchableOpacity
            style={{
              flex: 1,
              flexDirection: "row",
              alignItems: "center",
              alignSelf: "flex-start",
            }}
          >
            <Feather
              name="arrow-left"
              size={25}
              color={"black"}
              style={{ marginRight: 10 }}
            />
            <Text
              style={[styles.headingText, { fontSize: 18, fontWeight: "bold" }]}
            >
              Cups
            </Text>
          </TouchableOpacity>
          <View
            style={{
              flex: 1,
              flexDirection: "row",
              justifyContent: "space-evenly",
            }}
          >
            <TouchableOpacity>
              <Feather name="search" size={25} color={"black"} />
            </TouchableOpacity>
            <TouchableOpacity>
              <Feather name="heart" size={25} color={"black"} />
            </TouchableOpacity>
            <TouchableOpacity>
              <Feather name="shopping-bag" size={25} color={"black"} />
            </TouchableOpacity>
          </View>
        </View>
        {/* SubHeading */}
        <View style={{ height: 50 }}>
          <View
            style={{
              flexDirection: "row",
              flex: 1,
              justifyContent: "space-between",
              padding: 10,
            }}
          >
            <View>
              <Text style={[styles.text]}>86/100 Products</Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                flex: 0.6,
                justifyContent: "space-evenly",
              }}
            >
              <TouchableOpacity style={{ flexDirection: "row" }}>
                <Octicons
                  name="sort-asc"
                  size={20}
                  color={"#334155"}
                  style={{ marginRight: 5 }}
                />
                <Text style={[styles.text]}>Sort</Text>
              </TouchableOpacity>
              <TouchableOpacity style={{ flexDirection: "row" }}>
                <Feather
                  name="filter"
                  size={20}
                  color={"#334155"}
                  style={{ marginRight: 5 }}
                />
                <Text style={[styles.text]}>Filter</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* Items */}
        {mainData.length > 0 ? (
          <View style={{ alignSelf: "center" }}>
            <FlatList
              data={mainData}
              keyExtractor={(item) => item.id}
              renderItem={renderCard}
              numColumns={2}
              style={{ marginBottom: 200 }}
              ListFooterComponent={showLoader ? renderLoader : null}
              onEndReached={showLoader ? loadMoreData : null}
              onEndReachedThreshold={0.8}
              showsVerticalScrollIndicator={false}
            />
          </View>
        ) : null}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //
    alignItems: "center",
    //justifyContent: "center",
  },
  text: {
    fontFamily: "Poppins_500Medium",
    color: "black",
  },
  headingText: {
    fontFamily: "Poppins_700Bold",
    color: "black",
  },
});
