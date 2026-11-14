import MapView from '@/components/Map/MapView.tsx';
import MapHeader from '@/components/MapHeader/MapHeader.tsx';
import MapReconnectingAlert from '@/components/MapReconnectingAlert/MapReconnectingAlert.tsx';
import DetailsPanel from '@/components/DetailsPanel/DetailsPanel.tsx';

function App() {
    return (
        <>
            <MapHeader />
            <MapReconnectingAlert />
            <DetailsPanel />
            <MapView />
        </>
    );
}

export default App;
