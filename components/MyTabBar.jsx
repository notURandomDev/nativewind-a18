import React from 'react';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Animated, Text, TouchableOpacity, View } from 'react-native';
import ButtonAllinOne from './ButtonAllinOne';
import { router } from 'expo-router';
import { useNavigation } from '@react-navigation/native';

// Custom Tab Bar Component
const MyTabBar = ({ state, descriptors, navigation, variant = 'default' }) => {
  // const { position } = useTabAnimation();

  const isDefault = variant !== 'mini';
  const drawerNavigation = useNavigation();

  return (
    <View className={`flex-row items-center bg-transparent ${isDefault ? 'px-3' : ''}`}>
      {/* Left Icon */}

      {isDefault && (
        <ButtonAllinOne
          onPress={drawerNavigation.openDrawer}
          variant="ghost"
          containerStyles="pb-3">
          <Ionicons size={24} name="menu-outline" />
        </ButtonAllinOne>
      )}

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
              style={{ flex: 1, alignItems: 'center', paddingVertical: 14 }}>
              <View style={{ alignItems: 'center' }}>
                <Text
                  style={{
                    fontSize: isDefault ? 22 : 18,
                    fontWeight: '500',

                    color: isFocused ? '#1556F0' : '#000000',
                    textTransform: 'none',
                  }}>
                  {label}
                </Text>
                {isFocused && (
                  <Animated.View
                    style={{
                      backgroundColor: '#1556F0',
                      height: isDefault ? 3 : 2,
                      width: 28,
                      marginTop: 4,
                      borderRadius: 25,
                      // transform: [{ translateX: position }],
                    }}
                  />
                )}
              </View>
            </TouchableOpacity>
          );
        })}
      </View>

      {/* Right Icon */}

      {isDefault && (
        <ButtonAllinOne
          onPress={() => router.push('../../search')}
          variant="ghost"
          containerStyles="pb-3">
          <Ionicons size={24} name="search-outline" />
        </ButtonAllinOne>
      )}
    </View>
  );
};

export default MyTabBar;
