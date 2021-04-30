import GitHubOAuth2 from 'torii/providers/github-oauth2';

export default class GithubToriiProvider extends GitHubOAuth2 {
  fetch(data) {
    return data;
  }
}
