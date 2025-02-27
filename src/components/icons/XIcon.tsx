import React from 'react';
import Svg, { Line } from 'react-native-svg';
import { colors } from '../../styles/colors';

const XIcon = ({ size = 24, color = colors.textLight }) => {
  return (
    <Svg  testID="x-icon" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <Line x1="4" y1="4" x2="15" y2="15" />
      <Line x1="15" y1="4" x2="4" y2="15" />
    </Svg>
  );
};

export default XIcon;
