import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import {
  Container,
  Row,
  Col,
  Image,
  Badge,
  Card,
  Spinner,
  Alert,
} from "react-bootstrap";
import { ArrowLeft, Star } from "lucide-react";
import type { Movie } from "../types/Movie";
import type { Review } from "../types/Review";

const MovieDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [movie, setMovie] = useState<Movie | null>(null);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMovieAndReviews = async () => {
      try {
        const apiHost = import.meta.env.VITE_API_HOST || "";

        // Fetch Movie
        const movieRes = await fetch(`${apiHost}api/movie/${id}`);
        if (!movieRes.ok) throw new Error("Movie not found");
        const movieData = await movieRes.json();
        console.log("Id:", id);
        console.log("Movie details:");
        setMovie(movieData[0]);
        // Fetch Reviews
        const reviewsRes = await fetch(`${apiHost}api/review?movieId=${id}`);
        if (!reviewsRes.ok) throw new Error("Failed to fetch reviews");
        const reviewsData = await reviewsRes.json();
        console.log("Reviews:");
        setReviews(reviewsData);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchMovieAndReviews();
  }, [id]);

  const averageRating =
    reviews.length > 0
      ? (
          reviews.reduce((acc, review) => acc + review.rating, 0) /
          reviews.length
        ).toFixed(1)
      : null;

  function runtimeToStr(runtime: number): string {
    let result: string = "";
    const min: number = runtime % 60;
    const hour: number = (runtime - min) / 60;
    if (hour > 0) result += `${hour}h `;
    if (min > 0) result += `${min} min`;
    return result;
  }
  if (loading) {
    return (
      <Container className="text-center py-5">
        <Spinner animation="border" variant="primary" />
      </Container>
    );
  }

  if (error || !movie) {
    return (
      <Container className="py-5">
        <Alert variant="danger">{error || "Movie not found"}</Alert>
        <Link to="/" className="btn btn-primary">
          <ArrowLeft size={18} className="me-2" /> Back to Movies
        </Link>
      </Container>
    );
  }

  return (
    <Container className="py-4">
      <Link to="/" className="btn btn-link text-decoration-none mb-4 p-0">
        <ArrowLeft size={18} className="me-1" /> Back to Movies
      </Link>

      <Row className="mb-5">
        <Col md={4} lg={3} className="mb-4 mb-md-0">
          <Image src={movie.imageURL} fluid rounded className="shadow" />
        </Col>
        <Col md={8} lg={9}>
          <h1 className="fw-bold mb-2">{movie.title}</h1>
          <div className="mb-3">
            {/* Todo: fetch genres and ratings */}
            {/* <Badge bg="secondary" className="me-2">
              {genres[movie.genreId]}
            </Badge>
            <Badge bg="info" className="me-2">
              {retings[movie.ratingId]}
            </Badge> */}
            <span className="text-muted small">
              {runtimeToStr(movie.runtime)} •{" "}
              {new Date(movie.releaseDate).toLocaleDateString()}
            </span>
          </div>
          <h5 className="fw-bold mb-3">Synopsis</h5>
          <p className="lead fs-6 text-muted mb-0">{movie.synopsis}</p>
        </Col>
      </Row>

      <hr className="my-5" />

      <section>
        <div className="d-flex align-items-center justify-content-between mb-4">
          <h3 className="fw-bold mb-0">Critic Reviews</h3>
          {averageRating && (
            <Badge
              bg="warning"
              text="dark"
              className="fs-6 d-flex align-items-center py-2 px-3"
            >
              <Star size={18} fill="currentColor" className="me-2" />
              Average Rating: {averageRating}/10
            </Badge>
          )}
        </div>
        {reviews.length === 0 ? (
          <Alert variant="info">No reviews available for this movie yet.</Alert>
        ) : (
          <Row xs={1} className="g-4">
            {reviews.map((review, index) => (
              <Col key={index}>
                <Card className="border-0 shadow-sm">
                  <Card.Body>
                    <div className="d-flex justify-content-between align-items-start mb-3">
                      <div className="d-flex align-items-center">
                        {/* place for avatar but tmeporary using 1st letter of name */}
                        <div
                          className="bg-primary text-white rounded-circle d-flex align-items-center justify-content-center me-3"
                          style={{ width: "40px", height: "40px" }}
                        >
                          {review.name.charAt(0).toUpperCase()}
                        </div>
                        <div>
                          <h6 className="fw-bold mb-0">{review.name}</h6>
                          <small className="text-muted">Verified Critic</small>
                        </div>
                      </div>
                      <div className="d-flex align-items-center text-warning">
                        <Star size={18} fill="currentColor" className="me-1" />
                        <span className="fw-bold">{review.rating}/5</span>
                      </div>
                    </div>
                    <Card.Text className="fst-italic">
                      "{review.userReview}"
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        )}
      </section>
    </Container>
  );
};

export default MovieDetails;
