import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "./components/Layout.tsx";
import MovieList from "./components/MovieList.tsx";
import MovieDetails from "./components/MovieDetails.tsx";

export default function App() {
  return (
    <Router>
      <ThemeProvider>
        <Routes>
          <Route path="/" element={<MovieList />} />
          <Route path="/movie/:id" element={<MovieDetails />} />
        </Routes>
      </ThemeProvider>
    </Router>
  );
}
