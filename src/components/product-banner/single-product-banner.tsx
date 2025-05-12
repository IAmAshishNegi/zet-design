import React from 'react';
import { View, Image, Text, Button } from 'react-native';
import { B3, B4, H5, H6, SH3, SH6 } from '../ui';
import { LinearGradient } from 'expo-linear-gradient';


const SingleProductBanner: React.FC = () => {
return (
    <View className="flex-row overflow-hidden ">
        <LinearGradient
            colors={['#fef46f', '#fef796', '#fef46f']}
            start={{ x: 0, y: 0 }}
            end={{ x: 0.8, y: 1.5 }}
            className="w-full overflow-hidden py-4 px-4"
        >
            <Image source={require('../../assets/images/zetPlus.webp')} className="w-12 h-10" resizeMode="contain" />
       
      <View className="mt-4">
        <H5 className="text-[#332703]">Account Safety, 2x Rewards & More</H5>
        {/* <B4 className="text-neutral-600">Fraud Check | & More</B4> */}
      </View>
      {/* <Button
        title="Get 100% cashback"
        onPress={() => {}}
      /> */}
       </LinearGradient>
    </View>
  );
};

export default SingleProductBanner;

