import "./App.css";
import Banner from "./components/Banner/Banner";
import Navbar from "./components/Navbar/Navbar";
import requests from "./utils/requests";
import Row from './components/Row/Row'

function App() {
  return (
    <div className="App">
      <Navbar />
      <Banner fetchUrl={requests.fetchNetFlixOriginals} />
      <Row
        title="NetFlix Originals"
        fetchUrl={requests.fetchNetFlixOriginals}
        isLargeImg
      />
      <Row
        title="Trending Now"
        fetchUrl={requests.fetchTrending}
        isLargeImg={false}
      />
      <Row
        title="Top Rated"
        fetchUrl={requests.fetchTopRated}
        isLargeImg={false}
      />
      <Row
        title="Action Movies"
        fetchUrl={requests.fetchActionMovies}
        isLargeImg={false}
      />
      <Row
        title="Science Fiction"
        fetchUrl={requests.fetchScienceFiction}
        isLargeImg={false}
      />
      <Row
        title="Comedy Movies"
        fetchUrl={requests.fetchComedyMovies}
        isLargeImg={false}
      />
      <Row
        title="Animation Movies"
        fetchUrl={requests.fetchAnimationMovies}
        isLargeImg={false}
      />
      <Row
        title="Music Movies"
        fetchUrl={requests.fetchMusic}
        isLargeImg={false}
      />
      <Row
        title="Horror Movies"
        fetchUrl={requests.fetchHorrorMovies}
        isLargeImg={false}
      />
      <Row
        title="Romance Movies"
        fetchUrl={requests.fetchRomanceMovies}
        isLargeImg={false}
      />
      <Row
        title="Documentaries"
        fetchUrl={requests.fetchDocumentaries}
        isLargeImg={false}
      />
    </div>
  );
}

export default App;
