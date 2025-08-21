import React, { useState, useEffect } from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  FlatList,
  Text,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useWeatherStore } from '../../stores/weatherStore';
import { COLORS, SPACING, BORDER_RADIUS } from '../../constants';
import { Location } from '../../types/weather';

interface SearchBarProps {
  onSearch: (query: string) => void;
  placeholder?: string;
  loading?: boolean;
}

export const SearchBar: React.FC<SearchBarProps> = ({
  onSearch,
  placeholder = 'Search for a city...',
  loading = false,
}) => {
  const { theme } = useWeatherStore();
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState<Location[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [searchLoading, setSearchLoading] = useState(false);

  const { searchLocations } = useWeatherStore();

  useEffect(() => {
    const searchTimeout = setTimeout(async () => {
      if (query.trim().length >= 2) {
        setSearchLoading(true);
        try {
          const results = await searchLocations(query.trim());
          setSuggestions(results);
          setShowSuggestions(true);
        } catch (error) {
          setSuggestions([]);
        } finally {
          setSearchLoading(false);
        }
      } else {
        setSuggestions([]);
        setShowSuggestions(false);
      }
    }, 500); // Debounce search

    return () => clearTimeout(searchTimeout);
  }, [query, searchLocations]);

  const handleSearch = () => {
    if (query.trim()) {
      onSearch(query.trim());
      setShowSuggestions(false);
      setQuery('');
    }
  };

  const handleClear = () => {
    setQuery('');
    setSuggestions([]);
    setShowSuggestions(false);
  };

  const handleSuggestionPress = (location: Location) => {
    onSearch(`${location.name}, ${location.country}`);
    setShowSuggestions(false);
    setQuery('');
  };

  const renderSuggestion = ({ item }: { item: Location }) => (
    <TouchableOpacity
      style={[
        styles.suggestionItem,
        {
          backgroundColor: COLORS[theme].card,
          borderBottomColor: COLORS[theme].border,
        },
      ]}
      onPress={() => handleSuggestionPress(item)}
    >
      <Ionicons
        name="location"
        size={16}
        color={COLORS[theme].textSecondary}
        style={styles.suggestionIcon}
      />
      <Text
        style={[
          styles.suggestionText,
          {
            color: COLORS[theme].text,
          },
        ]}
      >
        {item.name}, {item.country}
      </Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View
        style={[
          styles.searchContainer,
          {
            backgroundColor: COLORS[theme].surface,
            borderColor: COLORS[theme].border,
          },
        ]}
      >
        <Ionicons
          name="search"
          size={20}
          color={COLORS[theme].textSecondary}
          style={styles.searchIcon}
        />
        
        <TextInput
          style={[
            styles.input,
            {
              color: COLORS[theme].text,
            },
          ]}
          placeholder={placeholder}
          placeholderTextColor={COLORS[theme].textSecondary}
          value={query}
          onChangeText={setQuery}
          onSubmitEditing={handleSearch}
          returnKeyType="search"
          autoCapitalize="words"
        />
        
        {searchLoading ? (
          <ActivityIndicator
            size="small"
            color={COLORS[theme].primary}
            style={styles.loadingIcon}
          />
        ) : query.length > 0 ? (
          <TouchableOpacity onPress={handleClear} style={styles.clearButton}>
            <Ionicons
              name="close-circle"
              size={20}
              color={COLORS[theme].textSecondary}
            />
          </TouchableOpacity>
        ) : null}
      </View>

      {showSuggestions && suggestions.length > 0 && (
        <View
          style={[
            styles.suggestionsContainer,
            {
              backgroundColor: COLORS[theme].card,
              borderColor: COLORS[theme].border,
            },
          ]}
        >
          <FlatList
            data={suggestions}
            renderItem={renderSuggestion}
            keyExtractor={(item) => `${item.id}-${item.name}`}
            style={styles.suggestionsList}
            showsVerticalScrollIndicator={false}
            nestedScrollEnabled={true}
          />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: SPACING.md,
    marginHorizontal: SPACING.lg,
    maxWidth: 400,
    alignSelf: 'center',
    width: '100%',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: BORDER_RADIUS.lg,
    paddingHorizontal: SPACING.md,
    height: 56,
    minHeight: 56,
  },
  searchIcon: {
    marginRight: SPACING.sm,
  },
  input: {
    flex: 1,
    fontSize: 18,
    paddingVertical: SPACING.sm,
    minHeight: 40,
  },
  loadingIcon: {
    marginLeft: SPACING.sm,
  },
  clearButton: {
    marginLeft: SPACING.sm,
    padding: SPACING.xs,
  },
  suggestionsContainer: {
    position: 'absolute',
    top: 55,
    left: 0,
    right: 0,
    borderWidth: 1,
    borderRadius: BORDER_RADIUS.md,
    maxHeight: 200,
    zIndex: 99999,
    elevation: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.4,
    shadowRadius: 12,
  },
  suggestionsList: {
    borderRadius: BORDER_RADIUS.md,
  },
  suggestionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
    borderBottomWidth: 1,
  },
  suggestionIcon: {
    marginRight: SPACING.sm,
  },
  suggestionText: {
    fontSize: 16,
    flex: 1,
  },
}); 