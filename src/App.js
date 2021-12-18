import Container from '@mui/material/Container';
import AdapterLuxon from '@mui/lab/AdapterLuxon';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import AppRoutes from 'routes';
import Navbar from 'components/Navbar';

function App() {
  return (
    <LocalizationProvider dateAdapter={ AdapterLuxon }>
      <div className="App">
        <Navbar title="Decide Stats Visualizer" />

        <Container maxWidth="xl">
          <AppRoutes />
        </Container>
      </div>
    </LocalizationProvider>
  );
}

export default App;
