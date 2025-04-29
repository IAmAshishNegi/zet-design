import React from "react";
import { Svg, Path, Circle } from "react-native-svg";
import Icon from "./Icon";
import { ViewStyle } from "react-native";

/**
 * HomeIcon component with three variants: stroke, duotone, and filled
 *
 * @param {Object} props - Component props
 * @param {string} props.color - Primary icon color (from theme or direct hex)
 * @param {string} props.secondaryColor - Secondary color for duotone variant
 * @param {number} props.size - Icon size (width and height)
 * @param {number} props.width - Custom width (overrides size)
 * @param {number} props.height - Custom height (overrides size)
 * @param {number} props.strokeWidth - Width of stroke for outlined variant
 * @param {string} props.variant - Icon variant: 'stroke', 'duotone', or 'filled'
 * @param {Object} props.style - Additional styles for the icon container
 *
 */

interface RupeeCoinIconProps {
  color?: string;
  secondaryColor?: string;
  size?: number;
  width?: number;
  height?: number;
  strokeWidth?: number;
  variant?: "stroke" | "duotone" | "filled";
  style?: ViewStyle;
}

function RupeeCoinIcon({
  color = "neutral.N500",
  secondaryColor = "neutral.N100",
  size = 24,
  width,
  height,
  strokeWidth = 1.5,
  variant = "stroke",
  style,
  ...props
}: RupeeCoinIconProps) {
  return (
    <Icon
      color={color}
      secondaryColor={secondaryColor}
      size={size}
      width={width}
      height={height}
      strokeWidth={strokeWidth}
      variant={variant as "stroke" | "duotone" | "filled"}
      style={style}
      {...props}
    >
      {({
        primaryColor,
        duotoneColor,
        strokeWidth,
        variant,
        width,
        height,
      }) => {
        switch (variant) {
          case "stroke":
            return (
              <Svg
                width={width}
                height={height}
                viewBox="0 0 24 24"
                fill="none"
              >
                <Path
                  d="M9.59869 11.0885H14.7988"
                  stroke={primaryColor}
                  strokeWidth={strokeWidth}
                  strokeLinecap="round"
                />
                <Path
                  d="M12.4685 16.2444L9.78402 13.1463H11.6158C12.3165 13.1463 12.8821 12.5807 12.8821 11.88V10.0735C12.8821 9.37279 12.3165 8.80719 11.6158 8.80719H9.06647H14.9335"
                  stroke={primaryColor}
                  strokeWidth={strokeWidth}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <Circle
                  cx="12"
                  cy="11.9587"
                  r="9.58576"
                  stroke={primaryColor}
                  strokeWidth={strokeWidth}
                />
              </Svg>
            );

          case "duotone":
            return (
              <Svg
                width={width}
                height={height}
                viewBox="0 0 24 24"
                fill="none"
              >
                <Circle cx="12" cy="11.9587" r="10.3358" fill={duotoneColor} />
                <Path
                  d="M9.59869 11.0885H14.7988"
                  stroke={primaryColor}
                  strokeWidth={strokeWidth}
                  strokeLinecap="round"
                />
                <Path
                  d="M12.4685 16.2444L9.78402 13.1463H11.6158C12.3165 13.1463 12.8821 12.5807 12.8821 11.88V10.0735C12.8821 9.37279 12.3165 8.80719 11.6158 8.80719H9.06647H14.9335"
                  stroke={primaryColor}
                  strokeWidth={strokeWidth}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <Circle
                  cx="12"
                  cy="11.9587"
                  r="9.58576"
                  stroke={primaryColor}
                  strokeWidth={strokeWidth}
                />
              </Svg>
            );

          case "filled":
            return (
              <Svg
                width={width}
                height={height}
                viewBox="0 0 24 24"
                fill="none"
              >
                <Path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M12 22.2945C17.7083 22.2945 22.3358 17.667 22.3358 11.9587C22.3358 6.2504 17.7083 1.62292 12 1.62292C6.29172 1.62292 1.66424 6.2504 1.66424 11.9587C1.66424 17.667 6.29172 22.2945 12 22.2945ZM8.41647 8.8072C8.41647 8.44821 8.70748 8.1572 9.06647 8.1572H14.9335C15.2925 8.1572 15.5835 8.44821 15.5835 8.8072C15.5835 9.16618 15.2925 9.4572 14.9335 9.4572H13.4312C13.4967 9.65054 13.5321 9.85781 13.5321 10.0735V10.4385H14.7988C15.1578 10.4385 15.4488 10.7295 15.4488 11.0885C15.4488 11.4475 15.1578 11.7385 14.7988 11.7385H13.5321V11.88C13.5321 12.9397 12.6755 13.7963 11.6158 13.7963H11.2073L12.9598 15.8187C13.1949 16.09 13.1655 16.5005 12.8942 16.7356C12.6229 16.9707 12.2124 16.9413 11.9773 16.67L9.29278 13.5719C9.12613 13.3796 9.08704 13.1077 9.19275 12.8763C9.29847 12.6448 9.52954 12.4963 9.78402 12.4963H11.6158C11.9576 12.4963 12.2321 12.2217 12.2321 11.88V11.7385H9.59869C9.23971 11.7385 8.94869 11.4475 8.94869 11.0885C8.94869 10.7295 9.23971 10.4385 9.59869 10.4385H12.2321V10.0735C12.2321 9.73178 11.9576 9.4572 11.6158 9.4572H9.06647C8.70748 9.4572 8.41647 9.16618 8.41647 8.8072Z"
                  fill={primaryColor}
                />
              </Svg>
            );

          default:
            return null;
        }
      }}
    </Icon>
  );
}

export default RupeeCoinIcon;
