import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import ClearIcon from '@mui/icons-material/Clear';
import { Collapse } from '@mui/material';

interface SearchPanelProps {
  onSearch: (searchTerm: string) => void;
  open: boolean;
}

export const SearchPanel: React.FC<SearchPanelProps> = ({ onSearch, open }) => {
  const [searchTerm, setSearchTerm] = React.useState('');

  const handleSearch = () => {
    onSearch(searchTerm);
  };

  const handleClear = () => {
    setSearchTerm('');
    onSearch('');
  };

  const handleKeyPress = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <Collapse in={open}>
      <Box sx={{ p: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
        <TextField
          fullWidth
          size="small"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Search..."
          InputProps={{
            endAdornment: searchTerm && (
              <IconButton size="small" onClick={handleClear}>
                <ClearIcon />
              </IconButton>
            ),
          }}
        />
        <IconButton onClick={handleSearch}>
          <SearchIcon />
        </IconButton>
      </Box>
    </Collapse>
  );
};