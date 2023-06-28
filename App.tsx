import { ActivityIndicator, FlatList, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import getData from './components/getData';
import Cols from './components/Cols';
import PieChart from 'react-native-pie-chart';

let widthAndHeight = 250

const App = () => {
  const [data, setData] = useState([])
  const [series, setSeries] = useState<number[]>([])
  const [sliceColor, setSliceColors] = useState<string[]>([])
  const fromAges = [18, 35, 70, 100]
  const dataSetter = {
    "0-18": {
      color: "#274653",
      value: 0
    },
    "19-35": {
      color: "#299D8E",
      value: 0
    },
    "36-70": {
      color: "#EAC46A",
      value: 0
    },
    "70+": {
      color: "#F4A161",
      value: 0
    }
  }

  useEffect(() => {
    (async () => {
      const data = await getData()
      setData(data.values)
    })()
  }, [])

  useEffect(() => {
    if (!data.length) return;
    data.map((item: string[]) => {
      const age = parseInt(item[1])
      if (age <= 18) {
        dataSetter["0-18"].value += 1
      } else if (age <= 35) {
        dataSetter["19-35"].value += 1
      } else if (age <= 70) {
        dataSetter["36-70"].value += 1
      } else {
        dataSetter["70+"].value += 1
      }
    })
    const dataSetterValues = Object.values(dataSetter)
    const series = dataSetterValues.map(item => item.value)
    const sliceColor = dataSetterValues.map(item => item.color)
    setSeries(series)
    setSliceColors(sliceColor)
  }, [data])


  const HeaderComponent = () => (
    <View style={styles.headerContainer}>
      <View style={styles.headerInnerContainer} >
        <Text style={styles.headerText}>Name</Text>
      </View>
      <View style={styles.headerInnerContainer} >
        <Text style={styles.headerText}>Age</Text>
      </View>
    </View>
  )

  const FooterComponent = () => (
    <View style={styles.FooterContainer}>
      <Text> Segmentation </Text>
      <PieChart
        widthAndHeight={widthAndHeight}
        series={series}
        sliceColor={sliceColor}
      />
      <FlatList
        data={fromAges}
        horizontal
        renderItem={({ item, index }) => {
          return (
            <View style={styles.FooterReturnContainer}>
              <View
                style={{
                  width: 20,
                  height: 20,
                  backgroundColor: sliceColor[index],
                  marginHorizontal: 5,
                }}
              />
              <Text>{fromAges[index - 1] ? fromAges[index - 1] === 70 ? `70+` : `${fromAges[index - 1] + 1}-${item}` : `0-${item}`}</Text>
            </View>
          )
        }}

      />
    </View>
  )

  return (
    <SafeAreaView style={styles.container}>
      {
        data.length === 0 || series.length === 0 || sliceColor.length === 0 ?
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="gray" />
          </View>
          :
          <View style={styles.innerContainer}>
            <FlatList
              data={data}
              ListHeaderComponent={HeaderComponent}
              ListFooterComponent={FooterComponent}
              renderItem={({ item }) => {
                const [name, age] = item as string[]
                return (
                  <Cols
                    name={name}
                    age={age}
                  />
                )
              }}
            />
          </View>
      }

    </SafeAreaView>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  innerContainer: {
    width: "90%"
  },
  headerContainer: {
    justifyContent: 'space-around',
    flexDirection: 'row',
    borderColor: 'gray',
    borderBottomWidth: 1,
    paddingHorizontal: 10,
  },
  headerText: {
    color: "gray"
  },
  headerInnerContainer: {
    width: "50%",
    paddingVertical: 10
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  FooterContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 20
  },
  FooterReturnContainer: {
    flexDirection: "row",
    marginVertical: 10
  }
});
