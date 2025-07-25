import React, { useState, useRef, useEffect } from 'react';
import { Search, MapPin } from 'lucide-react';
import { searchCities } from '../utils/weatherData';

interface SearchBarProps {
  onCitySelect: (city: string) => void;
  currentCity: string;
}

export const SearchBar: React.FC<SearchBarProps> = ({ onCitySelect, currentCity }) => {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleInputChange = async (value: string) => {
    setQuery(value);
    
    if (value.length > 1) {
      setLoading(true);
      try {
        const cities = await searchCities(value);
        setSuggestions(cities);
        setIsOpen(true);
      } catch (error) {
        console.error('Search error:', error);
      } finally {
        setLoading(false);
      }
    } else {
      setSuggestions([]);
      setIsOpen(false);
    }
  };

  const handleCitySelect = (city: string) => {
    setQuery('');
    setIsOpen(false);
    onCitySelect(city);
    inputRef.current?.blur();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      handleCitySelect(query);
    }
  };

  return (
    <div className="relative w-full max-w-md" ref={dropdownRef}>
      <form onSubmit={handleSubmit} className="relative">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => handleInputChange(e.target.value)}
            placeholder="Search for a city..."
            className="w-full pl-12 pr-4 py-3 bg-white/20 backdrop-blur-md border border-white/30 rounded-xl text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent transition-all duration-200"
          />
        </div>
      </form>

      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white/90 backdrop-blur-md border border-white/30 rounded-xl shadow-xl z-50 overflow-hidden">
          {loading ? (
            <div className="px-4 py-3 text-gray-600">
              <div className="animate-pulse">Searching...</div>
            </div>
          ) : suggestions.length > 0 ? (
            <div className="max-h-60 overflow-y-auto">
              {suggestions.map((city, index) => (
                <button
                  key={index}
                  onClick={() => handleCitySelect(city)}
                  className="w-full px-4 py-3 text-left hover:bg-white/50 transition-colors duration-150 flex items-center gap-3 text-gray-800"
                >
                  <MapPin className="w-4 h-4 text-gray-500" />
                  {city}
                </button>
              ))}
            </div>
          ) : query.length > 1 ? (
            <div className="px-4 py-3 text-gray-600">No cities found</div>
          ) : null}
        </div>
      )}

      <div className="flex items-center gap-2 mt-3 text-white/80">
        <MapPin className="w-4 h-4" />
        <span className="text-sm">Current: {currentCity}</span>
      </div>
    </div>
  );
};