export type QueryParams = {
  page?: number;
  limit?: number;
  search?: string;
  genre?: string;
}

export type Movie = {
  id: string;
  title: string;
  posterUrl?: string;
  rating?: string;
  summary?: string;
  directors?: string[];
  mainActors?: string[];
  datePublished?: string;
  ratingValue?: number;
  bestRating?: number;
  worstRating?: number;
  writers?: string[];
  genres?: Genre[];
};

export type Genre = {
  id: string;
  title: string;
};

export class MovieDBClient {
  private readonly baseUrl =
    "https://0kadddxyh3.execute-api.us-east-1.amazonaws.com";
  private authToken: string | undefined;

  constructor() { }

  public async init() {
    const tokenResponse = await this.request<{ token: string }>("GET", "/auth/token");

    if (!tokenResponse?.token) {
      throw new Error("failed to get auth token");
    }

    this.authToken = tokenResponse.token;
  }

  public async getMovies(params: QueryParams) {
    const searchParams = this.getSearchParams(params);
    const path = `/movies?${searchParams.toString()}`;

    const moviesResponse = await this.request<{
      data: Movie[];
      totalPages: number
    }>("GET", path);

    return moviesResponse;
  }

  public async getMovie(id: string) {
    const path = `/movies/${id}`;

    const movieResponse = await this.request<Movie>("GET", path);

    return movieResponse;
  }

  public async getCountOfMovies(page: number): Promise<number> {
    const searchParams = this.getSearchParams({ page });
    const path = `/movies/titles?${searchParams.toString()}`;

    const response = await this.request<{
      data: Movie[],
      totalPages: number;
    }>("GET", path);

    if (response?.totalPages === page) {
      return response.data.length;
    }

    const countNextPage = await this.getCountOfMovies(page + 1);

    return response?.data?.length || 0 + countNextPage;
  }

  public async getGenres() {
    const path = "/genres/movies";

    const response = await this.request<{
      data: Genre[]
    }>("GET", path);

    if (!response?.data) {
      throw new Error("failed to get genres");
    }

    const genres = response.data.map((genre) => {
      return {
        id: genre.id,
        title: genre.title,
      };
    });

    return genres;
  }

  private getSearchParams(params: any) {
    const searchParams = new URLSearchParams();

    Object.keys(params).forEach((paramKey) => {
      const paramValue = params[paramKey];

      if (paramValue) {
        searchParams.append(paramKey, paramValue);
      }
    });

    return searchParams;
  }

  private getHeaders() {
    const headers = {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${this.authToken}`
    };

    return headers;
  }

  private async request<T>(method: string, path: string, body?: any): Promise<T | undefined> {
    // Make sure we have an auth token for every request (except to get an auth token)
    if (!this.authToken && path !== "/auth/token") {
      await this.init();
    }
    const headers = this.getHeaders();

    const request = await fetch(`${this.baseUrl}${path}`, {
      method: method,
      headers: headers,
      body: body ? JSON.stringify(body) : undefined,
    });

    if (!request.ok) {
      throw new Error(JSON.stringify({
        msg: `error caught making request to ${path}`,
        response: await request.text()
      }))
    }

    return request.json();
  }
}
