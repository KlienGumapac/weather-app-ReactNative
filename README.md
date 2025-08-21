# Weather App

A beautiful and modern weather application built with React Native Web and Expo, featuring real-time weather data from OpenWeatherMap API.

**👨‍💻 Developer:** [Klien Gumapac](https://github.com/KlienGumapac)

## Features

- 🌤️ **Current Weather**: Real-time weather information with temperature, humidity, wind, and pressure
- 📅 **5-Day Forecast**: Detailed weather forecast for the next 5 days
- 🔍 **City Search**: Search for any city worldwide
- 📍 **Location Services**: Get weather for your current location (mobile only)
- ❤️ **Favorites**: Save and manage your favorite locations
- 🌙 **Dark/Light Theme**: Toggle between light and dark themes
- 🌡️ **Unit Conversion**: Switch between Celsius and Fahrenheit
- 📱 **Cross-Platform**: Works on iOS, Android, and Web
- 🔄 **Pull to Refresh**: Refresh weather data with pull-to-refresh gesture

## Tech Stack

- **Framework**: React Native Web + Expo
- **Language**: TypeScript
- **State Management**: Zustand
- **Data Fetching**: TanStack Query (React Query)
- **HTTP Client**: Axios
- **Storage**: AsyncStorage
- **Icons**: Expo Vector Icons
- **Location**: Expo Location
- **Styling**: React Native StyleSheet

## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── ui/             # Base UI components (Container, Card, Text, Button, etc.)
│   └── weather/        # Weather-specific components
├── screens/            # Screen components
├── hooks/              # Custom React hooks
├── services/           # API services
├── stores/             # Zustand stores
├── types/              # TypeScript type definitions
├── utils/              # Utility functions
└── constants/          # App constants
```

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Expo CLI
- OpenWeatherMap API key

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/KlienGumapac/weather-app-ReactNative.git
   cd weather-app-ReactNative
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Configure API Key**
   The OpenWeatherMap API key is already configured in the project. If you want to use your own key, update it in `src/constants/index.ts`.

4. **Start the development server**

   ```bash
   # For web
   npm run web

   # For iOS (requires macOS)
   npm run ios

   # For Android
   npm run android
   ```

## API Configuration

The app uses the OpenWeatherMap API. The API key is configured in `src/constants/index.ts`:

```typescript
export const API_CONFIG = {
  BASE_URL: "https://api.openweathermap.org/data/2.5",
  API_KEY: "your-api-key-here",
  // ...
};
```

## Key Components

### Reusable UI Components

- **Container**: Base container with safe area handling and theme support
- **Card**: Reusable card component with elevation and border radius
- **Text**: Typography component with consistent styling
- **Button**: Button component with multiple variants and states
- **SearchBar**: Search input with loading states

### Weather Components

- **CurrentWeather**: Displays current weather information
- **Forecast**: Shows 5-day weather forecast
- **WeatherIcon**: Renders weather icons from OpenWeatherMap

### State Management

The app uses Zustand for state management with persistence:

- Weather data (current weather, forecast)
- User preferences (theme, temperature unit)
- Favorites management
- Loading and error states

## Features in Detail

### Current Weather

- Temperature with feels-like temperature
- Weather description and icon
- Humidity, wind speed, and pressure
- Location name

### Forecast

- 5-day weather forecast
- Average temperature per day
- Weather conditions and icons
- Horizontal scrollable layout

### Search

- Real-time city search
- Location suggestions
- Error handling for invalid cities

### Settings

- Theme toggle (light/dark)
- Temperature unit toggle (Celsius/Fahrenheit)
- Favorites management
- App information

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## Connect with Me

- **GitHub:** [@KlienGumapac](https://github.com/KlienGumapac)

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- [OpenWeatherMap](https://openweathermap.org/) for weather data API
- [Expo](https://expo.dev/) for the development platform
- [React Native](https://reactnative.dev/) for the framework
