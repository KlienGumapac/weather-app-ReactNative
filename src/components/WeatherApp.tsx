import React, { useState, useRef } from 'react';
import { View, StyleSheet, Animated, Dimensions, Text } from 'react-native';
import { useWeatherStore } from '@/stores/weatherStore';
import { Sidebar } from '@/components/Sidebar';
import { WeatherContent } from '@/components/WeatherContent';
import { SettingsContent } from '@/components/SettingsContent';
import { COLORS } from '@/constants';

const { width } = Dimensions.get('window');
const SIDEBAR_WIDTH = Math.min(320, width * 0.7); 

type ActiveTab = 'weather' | 'settings';

export const WeatherApp: React.FC = () => {
  const { theme } = useWeatherStore();
  const [activeTab, setActiveTab] = useState<ActiveTab>('weather');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const slideAnim = useRef(new Animated.Value(0)).current;

  const toggleSidebar = () => {
    const toValue = sidebarOpen ? 0 : 1;
    Animated.timing(slideAnim, {
      toValue,
      duration: 300,
      useNativeDriver: false,
    }).start();
    setSidebarOpen(!sidebarOpen);
  };

  const renderContent = () => {
    try {
      switch (activeTab) {
        case 'weather':
          return <WeatherContent onMenuPress={toggleSidebar} />;
        case 'settings':
          return <SettingsContent onMenuPress={toggleSidebar} />;
        default:
          return <WeatherContent onMenuPress={toggleSidebar} />;
      }
    } catch (error) {
      console.error('Error rendering content:', error);
      return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Text style={{ color: COLORS[theme].text }}>Error loading content</Text>
        </View>
      );
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: COLORS[theme].background }]}>
      {/* Sidebar */}
      <Animated.View
        style={[
          styles.sidebar,
          {
            transform: [
              {
                translateX: slideAnim.interpolate({
                  inputRange: [0, 1],
                  outputRange: [-SIDEBAR_WIDTH, 0],
                }),
              },
            ],
          },
        ]}
      >
        <Sidebar
          activeTab={activeTab}
          onTabChange={(tab: string) => setActiveTab(tab as ActiveTab)}
          onClose={() => toggleSidebar()}
        />
      </Animated.View>

      {/* Main Content */}
      <Animated.View
        style={[
          styles.mainContent,
          {
            transform: [
              {
                translateX: slideAnim.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0, SIDEBAR_WIDTH],
                }),
              },
            ],
          },
        ]}
      >
        {renderContent()}
      </Animated.View>

      {/* Overlay */}
      {sidebarOpen && (
        <Animated.View
          style={[
            styles.overlay,
            {
              opacity: slideAnim,
            },
          ]}
          onTouchEnd={toggleSidebar}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  sidebar: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    width: SIDEBAR_WIDTH,
    zIndex: 1000,
  },
  mainContent: {
    flex: 1,
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    zIndex: 999,
  },
}); 