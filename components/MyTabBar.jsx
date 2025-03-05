import React from 'react';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Text, TouchableOpacity, View } from 'react-native';

// Custom Tab Bar Component
const MyTabBar = ({ state, descriptors, navigation }) => {
  return (
    <View style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: 'transparent' }}>
      {/* Left Icon */}
      <Ionicons size={24} name="menu-outline" />

      {/* Tab Bar Content */}
      <View style={{ flex: 1, flexDirection: 'row' }}>
        {state.routes.map((route, index) => {
          const { options } = descriptors[route.key];
          const label = options.title || route.name;
          const isFocused = state.index === index;

          const onPress = () => {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
              canPreventDefault: true,
            });

            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name);
            }
          };

          return (
            <TouchableOpacity
              key={route.key}
              onPress={onPress}
              style={{ flex: 1, alignItems: 'center', paddingVertical: 10 }}>
              <View style={{ alignItems: 'center' }}>
                <Text
                  style={{
                    fontSize: 22,
                    color: isFocused ? '#1556F0' : '#000000',
                    textTransform: 'none',
                  }}>
                  {label}
                </Text>
                {isFocused && (
                  <View
                    style={{
                      backgroundColor: '#1556F0',
                      height: 2,
                      width: 30,
                      marginTop: 4,
                      marginLeft: '50%',
                      transform: [{ translateX: -15 }],
                    }}
                  />
                )}
              </View>
            </TouchableOpacity>
          );
        })}
      </View>

      {/* Right Icon */}
      <Ionicons size={24} name="search-outline" />
    </View>
  );
};

export default MyTabBar;
