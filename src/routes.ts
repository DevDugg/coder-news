interface Route {
  item: (itemId: string) => string;
  newStories: string;
}

const apiUrl: string = "https://hacker-news.firebaseio.com/v0";

const routes: Route = {
  item: (itemId: string) => `/item/${itemId}.json`,
  newStories: "/topstories.json",
};

export { apiUrl, routes };
