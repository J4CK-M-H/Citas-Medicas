import { Box, IconButton, InputAdornment, TextField } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

interface IBuscardorProps {
  searchValue: string;
  onSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSearchSubmit: () => void;
}
const Buscador = ({
  searchValue,
  onSearchChange,
  onSearchSubmit,
}: IBuscardorProps) => {
  return (
    <Box
      component="form"
      onSubmit={(event) => {
        event.preventDefault();
        onSearchSubmit();
      }}
      sx={{
        marginLeft: "auto",
        marginRight: "0",
        // justifyContent: "end",
      }}
    >
      <TextField
        variant="outlined"
        placeholder="Buscar..."
        value={searchValue}
        onChange={onSearchChange}
        sx={{
          "& .MuiInputBase-root": { height: "40px" },
          "& .MuiInputBase-input": { padding: "0 8px", height: "40px" },
        }}
        slotProps={{
          input: {
            startAdornment: (
              <InputAdornment position="start">
                <IconButton edge="start" type="submit">
                  <SearchIcon />
                </IconButton>
              </InputAdornment>
            ),
          },
        }}
      />
    </Box>
  );
};

export default Buscador;
