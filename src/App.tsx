import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Layout from './components/Layout/Layout';
import LocationForm from './components/LocationForm/LocationForm';
import LocationTable from './components/LocationTable/LocationTable';
import LocationMap from './components/LocationMap/LocationMap';
import { LocationPageProvider } from './contexts/LocationPageContext';
import { CategoryFilterProvider } from './contexts/CategoryFilterContext';
import './App.css';

const theme = createTheme({
  palette: {
    mode: 'light',
    background: {
      default: '#f5f5f5',
      paper: '#ffffff',
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <LocationPageProvider>
        <CategoryFilterProvider>
          <div className="App">
            <Layout
              FormComponent={LocationForm}
              TableComponent={LocationTable}
              MapComponent={LocationMap}
            />
          </div>
        </CategoryFilterProvider>
      </LocationPageProvider>
    </ThemeProvider>
  );
}

export default App;
