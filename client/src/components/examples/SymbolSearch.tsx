import SymbolSearch from '../SymbolSearch';

export default function SymbolSearchExample() {
  const handleSearch = (symbol: string) => {
    console.log('Search triggered for:', symbol);
  };

  return <SymbolSearch onSearch={handleSearch} />;
}