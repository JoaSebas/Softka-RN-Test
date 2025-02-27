import React from 'react';
import Svg, {Path} from 'react-native-svg';
import {colors} from '../../styles/colors';

const ChevronRight = ({size = 24, color = colors.icons}) => {
  return (
    <Svg testID="chevron-right-icon"  width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M9 6L15 12L9 18"
        stroke={color}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
};

export default ChevronRight;
