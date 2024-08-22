import Icon from 'react-native-vector-icons/FontAwesome';
import {Pressable, View, StyleSheet} from 'react-native';

function IconButton({icon, color, size, onPress}) {
  return (
    <Pressable
      onPress={onPress}
      style={({pressed}) => pressed && styles.pressed}>
      <View style={styles.buttonContainer}>
        <Icon name={icon} color={color} size={size} />
      </View>
    </Pressable>
  );
}
export default IconButton;

const styles = StyleSheet.create({
  buttonContainer: {
    borderRadius: 24,
    padding: 6,
    margin: 8,
  },
  pressed: {
    opacity: 0.75,
  },
});
