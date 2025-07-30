import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

// Responsive width
export const rw = (size: number) => wp(`${size}%`);

// Responsive height
export const rh = (size: number) => hp(`${size}%`);

// Responsive font size (based on screen width)
export const rs = (size: number) => wp(`${size}%`);

// Common spacings
export const spacing = {
  xs: rw(2),
  sm: rw(4),
  md: rw(6),
  lg: rw(8),
  xl: rw(10),
};

// Common font sizes
export const fontSizes = {
  xs: rs(1.2),
  sm: rs(2),
  md: rs(3),
  lg: rs(4),
  xl: rs(7),
  xxl: rs(8),
  xxxl: rs(9),
};

// Common radius sizes
export const radius = {
  xs: rw(1),
  sm: rw(2),
  md: rw(3),
  lg: rw(4),
  xl: rw(5),
  round: rw(50),
};
