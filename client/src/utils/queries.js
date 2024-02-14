import { gql } from '@apollo/client';

export const QUERY_USER = gql`
query User($username: String!) {
  user(username: $username) {
    _id
    email
    priorRuns {
      datePlayed
      difficultyModifier
      runtime
      score
      targetNumber
    }
    statistics {
      avgScore
      runNumber
      highScore
    }
    username
  }
}

`;

export const QUERY_HIGHSCORES = gql`
query Users {
  users {
    _id
    username
    statistics {
      avgScore
      highScore
      runNumber
    }
  }
}
`;



export const QUERY_ME = gql`
query Me {
  me {
    _id
    email
    priorRuns {
      datePlayed
      runtime
      difficultyModifier
      score
      targetNumber
    }
    statistics {
      avgScore
      highScore
      runNumber
    }
    username
  }
}
`;
