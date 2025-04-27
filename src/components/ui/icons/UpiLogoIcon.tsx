import React from "react";
import { Svg, Path } from "react-native-svg";
import { ViewStyle } from "react-native";
import { View } from "react-native";

interface UpiLogoIconProps {
  width?: number;
  height?: number;
  style?: ViewStyle;
}

function UpiLogoIcon({
  width = 26,
  height = 26,
  style,
  ...props
}: UpiLogoIconProps) {
  // Calculate aspect ratio - original SVG is 510×203
  const aspectRatio = 510 / 203;
  const finalHeight =
    height || (width ? width / aspectRatio : 26 / aspectRatio);

  return (
    <View style={[{ width, height: finalHeight }, style]} {...props}>
      <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <Path
          d="M14.2782 0.618449L19.9402 12.0015L8.0379 23.3814L14.2782 0.618449Z"
          fill="#27803B"
        />
        <Path
          d="M10.3092 0.618449L15.967 12.0015L4.05983 23.3814L10.3092 0.618449Z"
          fill="#E9661C"
        />
      </Svg>
    </View>
  );
}

export default UpiLogoIcon;
