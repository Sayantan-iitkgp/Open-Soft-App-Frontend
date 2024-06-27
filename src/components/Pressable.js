import React from "react";
import { ScrollView, VStack, Center, useTheme, Heading, NativeBaseProvider } from "native-base";
import MyDropdown from "./PresenceTransition";

const Scroller = () => {
  const {
    colors
  } = useTheme();
  return <ScrollView w={["full", "full"]} h="80">
      <Center mt="3" mb="4">
        {/* hello world */}
        <MyDropdown title={"Premium"} 
        content={"4K+HDR |\nMonthly Price: $500 |\nBest video quality |\nSpatial Audio |\n"} 
        buttonText={"Buy Now"}/>
        <MyDropdown title={"Standard"} 
        content={"1080p (Full HD) |\nMonthly Price: $300 |\nGreat video quality |\nSurround Sound |\n"}
        buttonText={"Buy Now"}/>
        <MyDropdown title={"Basic"} 
        content={"720p (HD) |\nMonthly Price: $200 |\nGood video quality |\nStandard Sound |\n"} 
        buttonText={"Buy Now"}/>
        <MyDropdown title={"Mobile"}
         content={"490p |\nMonthly Price: $100 |\nFair video quality |\nNormal Sound |\n"} 
         buttonText={"Buy Now"}/>
  
      </Center>
      
    </ScrollView>;
};

    export default () => {
        return (
          <NativeBaseProvider>
            <Center flex={1} px="3">
                <Scroller/>
            </Center>
          </NativeBaseProvider>
        );
    };
    