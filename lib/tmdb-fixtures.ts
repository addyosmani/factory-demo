export const mockTrending = [
  { id: 550, title: "Fight Club", overview: "A sleepless office worker meets a soap maker who turns his ideas about modern life into an underground movement.", poster_path: "/pB8BM7pdSp6B6Ih7QZ4DrQ3PmJK.jpg", backdrop_path: "/hZkgoQYus5vegHoetLkCJzb17zJ.jpg", release_date: "1999-10-15", vote_average: 8.4 },
  { id: 13, title: "Forrest Gump", overview: "A man with a kind heart finds himself present at defining moments in twentieth-century America.", poster_path: "/arw2vcBveWOVZr6pxd9XTd1TdQa.jpg", backdrop_path: "/qdIMHd4sEfJSckfVJfKQvisL02a.jpg", release_date: "1994-07-06", vote_average: 8.5 },
  { id: 680, title: "Pulp Fiction", overview: "The lives of two mob hitmen, a boxer, and a pair of diner bandits intertwine in Los Angeles.", poster_path: "/d5iIlFn5s0ImszYzBPb8JPIfbXD.jpg", backdrop_path: "/suaEOtk1N1sgg2MTM7oZd2cfVp3.jpg", release_date: "1994-09-10", vote_average: 8.5 },
  { id: 155, title: "The Dark Knight", overview: "Batman faces a criminal mastermind who pushes Gotham and its heroes toward chaos.", poster_path: "/qJ2tW6WMUDux911r6m7haRef0WH.jpg", backdrop_path: "/nMKdUUepR0i5zn0y1T4CsSB5chy.jpg", release_date: "2008-07-16", vote_average: 8.5 },
  { id: 157336, title: "Interstellar", overview: "Explorers travel through a wormhole in space in an attempt to ensure humanity's survival.", poster_path: "/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg", backdrop_path: "/xJHokMbljvjADYdit5fK5VQsXEG.jpg", release_date: "2014-11-05", vote_average: 8.5 },
  { id: 122, title: "The Return of the King", overview: "The final battle for Middle-earth begins as Frodo and Sam approach Mount Doom.", poster_path: "/rCzpDGLbOoPwLjy3OAm5NUPOTrC.jpg", backdrop_path: "/2u7zbn8EudG6kLlBzUYqP8RyFU4.jpg", release_date: "2003-12-01", vote_average: 8.5 },
  { id: 429, title: "The Good, the Bad and the Ugly", overview: "Three gunslingers hunt for buried gold during the American Civil War.", poster_path: "/bX2xnavhMYjWDoZp1VM6VnU1xwe.jpg", backdrop_path: "/x4biAVdPVCghBlsVIzB6NmbghIz.jpg", release_date: "1966-12-23", vote_average: 8.5 },
];

export const mockPopular = [
  { id: 238, title: "The Godfather", overview: "The aging patriarch of an organized crime dynasty transfers control to his reluctant son.", poster_path: "/3bhkrj58Vtu7enYsRolD1fZdja1.jpg", backdrop_path: "/tmU7GeKVybMWFButWEGl2M4GeiP.jpg", release_date: "1972-03-14", vote_average: 8.7 },
  { id: 278, title: "The Shawshank Redemption", overview: "Two imprisoned men bond over decades, finding solace and redemption through quiet acts of decency.", poster_path: "/9cqNxx0GxF0bflZmeSMuL5tnGzr.jpg", backdrop_path: "/kXfqcdQKsToO0OUXHcrrNCHDBzO.jpg", release_date: "1994-09-23", vote_average: 8.7 },
  { id: 424, title: "Schindler's List", overview: "A German industrialist gradually becomes concerned for his Jewish workforce during World War II.", poster_path: "/sF1U4EUQS8YHUYjNl3pMGNIQyr0.jpg", backdrop_path: "/zb6fM1CX41D9rF9hdgclu0peUmy.jpg", release_date: "1993-12-15", vote_average: 8.6 },
  { id: 497, title: "The Green Mile", overview: "A prison guard discovers that a death-row inmate has a mysterious gift.", poster_path: "/8VG8fDNiy50H4FedGwdSVUPoaJe.jpg", backdrop_path: "/l6hQWH9eDksNJNiXWYRkWqikOdu.jpg", release_date: "1999-12-10", vote_average: 8.5 },
  { id: 769, title: "GoodFellas", overview: "The rise and fall of a mob associate unfolds across three decades.", poster_path: "/aKuFiU82s5ISJpGZp7YkIr3kCUd.jpg", backdrop_path: "/sw7mordbZxgITU877yTpZCud90M.jpg", release_date: "1990-09-12", vote_average: 8.5 },
  { id: 389, title: "12 Angry Men", overview: "A dissenting juror forces a jury to reconsider the evidence before them.", poster_path: "/ow3wq89wM8qd5X7hWKxiRfsFf9C.jpg", backdrop_path: "/bxgTSUenZDHNFerQ1whRKplrMKF.jpg", release_date: "1957-04-10", vote_average: 8.5 },
];

export const mockDetail = {
  ...mockTrending[0],
  genres: [{ id: 18, name: "Drama" }, { id: 53, name: "Thriller" }],
  homepage: "https://www.20thcenturystudios.com/movies/fight-club",
  runtime: 139,
  tagline: "Mischief. Mayhem. Soap.",
};
