import { render, screen, fireEvent } from "@testing-library/react";
import Card from "./Card";
import fallback from "../../public/fallback.png";

const mockMovie = {
  id: "123",
  name: "Inception",
  thumbnail: "https://example.com/inception.jpg",
  description: "A mind-bending thriller.",
  genres: ["Sci-Fi", "Thriller"],
  duration: "148 mins"
};

describe("Card Component", () => {
  test("renders movie details correctly", () => {
    render(<Card {...mockMovie} />);

    expect(screen.getByText("Inception")).toBeInTheDocument();
    expect(screen.getByText("A mind-bending thriller.")).toBeInTheDocument();
    expect(screen.getByText("Duration: 148 mins")).toBeInTheDocument();

    mockMovie.genres.forEach((genre) => {
      expect(screen.getByText(genre)).toBeInTheDocument();
    });

    const img = screen.getByAltText(/movie poster for inception/i) as HTMLImageElement;
    expect(img.src).toBe(mockMovie.thumbnail);
  });

  test("sets fallback image on error", () => {
    render(<Card {...mockMovie} />);

    const img = screen.getByAltText(/movie poster for inception/i) as HTMLImageElement;

    // Simulate image load error
    fireEvent.error(img);
    expect(img.src).toContain(fallback.src);
  });
});