import React from 'react';
import { View } from 'react-native';
import Button from '../atoms/Button';
import { globalStyles } from '../../styles/globalStyles';

interface ActionButtonsProps {
  primaryText: string;
  onPrimaryPress: () => void;
  primaryType?: 'primary' | 'secondary' | 'danger';

  secondaryText: string;
  onSecondaryPress: () => void;
  secondaryType?: 'primary' | 'secondary' | 'danger';
}

const ActionButtons: React.FC<ActionButtonsProps> = ({
  primaryText,
  onPrimaryPress,
  primaryType = 'primary',
  secondaryText,
  onSecondaryPress,
  secondaryType = 'secondary',
}) => {
  return (
    <View style={globalStyles.buttonContainer}>
      <Button text={primaryText} onPress={onPrimaryPress} type={primaryType} />
      <Button text={secondaryText} onPress={onSecondaryPress} type={secondaryType} />
    </View>
  );
};

export default ActionButtons;
