# Developer Wrapped 2025

A Spotify Wrapped-style visualization of your GitHub activity for 2025. View your commits, PRs, top languages, repository breakdown, and fun stats in an interactive slideshow experience.

## Features

- **GitHub Overview**: Total commits, PRs opened, and PRs merged
- **Activity Streaks**: Longest and current contribution streaks with weekly contribution graph
- **Code Review Stats**: Reviews given and badges earned
- **Top Languages**: Visual breakdown of languages used
- **Repository Treemap**: Visual representation of commit distribution across repos
- **Graphite Integration**: Support for Graphite PR workflow stats
- **Fun Facts**: Most productive day, favorite commit hour, and achievement badges

## Demo

The app displays stats as an animated slideshow with:
- Matrix-style background animation
- Typewriter text effects
- Animated number counters
- Interactive navigation (arrow keys, swipe, or click)

## Usage

1. Clone the repository
2. Edit `data.json` with your GitHub stats
3. Open `index.html` in a browser

No build step required - it's a static HTML/CSS/JS application.

## Customizing Your Data

Update `data.json` with your information:

```json
{
  "year": 2025,
  "user": {
    "name": "Your Name",
    "github": "your-username"
  },
  "github": {
    "totalCommits": 1000,
    "longestStreak": 30,
    "currentStreak": 5,
    "prsOpened": 100,
    "prsMerged": 90,
    "reviewsGiven": 50,
    "topLanguages": [
      { "name": "Python", "percent": 60, "color": "#3572A5" },
      { "name": "TypeScript", "percent": 30, "color": "#3178c6" }
    ],
    "repoPareto": [
      { "repo": "org/repo-name", "commits": 500 }
    ]
  }
}
```

## Tech Stack

- Vanilla HTML/CSS/JavaScript
- No dependencies or build tools required
- CSS glassmorphism effects
- Canvas-based matrix rain animation

## License

MIT License - see [LICENSE](LICENSE) for details.
