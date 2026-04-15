import React, { useState, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  //   Badge,
  Spinner,
  Alert,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import type { Movie } from "../types/Movie";

const MovieList: React.FC = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState<string>("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const apiHost = import.meta.env.VITE_API_HOST || "";
        const res = await fetch(`${apiHost}api/movies`);
        if (!res.ok) throw new Error("Failed to fetch movies");
        const data = await res.json();
        console.log("Movies:");
        console.log(data);
        setMovies(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Todo: searchFunc

  // const searchFunc = (event) => {
  //     setText(event.target.value);
  //   };
  if (loading) {
    return (
      <Container className="text-center py-5">
        <Spinner animation="border" variant="primary" />
      </Container>
    );
  }

  if (error) {
    return (
      <Container className="py-5">
        <Alert variant="danger">{error}</Alert>
      </Container>
    );
  }

  return (
    <Container className="py-4">
      {/* <form>
        <div className="mb-3">
          <label htmlFor="search" className="form-label">
            Search
          </label>
          <input
            type="text"
            className="form-control"
            id="search"
            onChange={setSearch}
          />
        </div>
      </form> */}
      <h2 className="mb-4 fw-bold">Featured Movies</h2>
      <Row xs={1} md={2} lg={3} xl={4} className="g-4">
        {movies.map((movie) => {
          if (search.length !== 0) {
            if (movie.title != search) {
              return;
            }
          }
          return (
            <Col key={movie.id}>
              <Link to={`/movie/${movie.id}`}>
                <Card className="border-0 shadow-sm hover-card transition-all">
                  <div className="overflow-hidden rounded-top">
                    <Card.Img
                      variant="top"
                      src={movie.imageURL}
                      alt={movie.title}
                      className="object-fit-cover"
                    />
                  </div>
                  <Card.Body className="d-flex flex-column">
                    <Card.Title className="fw-bold text-truncate">
                      {movie.title}
                    </Card.Title>
                    {/* Todo: fetch genres and ratings */}
                    {/* <div className="mb-2">
                <Badge bg="secondary" className="me-1">Genre {movie.genreId}</Badge>
                <Badge bg="info">Rating {movie.ratingId}</Badge>
                            </div> */}
                    <Card.Text className="text-muted small mb-3 line-clamp-2">
                      {movie.synopsis}
                    </Card.Text>
                    <Link
                      to={`/movie/${movie.id}`}
                      className="btn btn-outline-primary mt-auto w-100 fw-medium"
                    >
                      View Reviews
                    </Link>
                  </Card.Body>
                </Card>
              </Link>
            </Col>
          );
        })}
      </Row>
    </Container>
  );
};

export default MovieList;
