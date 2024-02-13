import { gql } from '@apollo/client';

export const ADD_USER = gql`
mutation AddUser($username: String!, $password: String!, $email: String!) {
  addUser(username: $username, password: $password, email: $email) {
    token
    user {
      _id
      email
      priorRuns {
        datePlayed
        runtime
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
}
`;

export const LOGIN_USER = gql`
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        username
        password
        email
        _id
        statistics {
          avgScore
          highScore
          runNumber
        }
      }
    }
  }
`;

export const ADD_RUN = gql`
  mutation AddRun($datePlayed: String, $runtime: Float, $targetNumber: Int, $score: Int) {
    addRun(datePlayed: $datePlayed, runtime: $runtime, targetNumber: $targetNumber, score: $score) {
      token
      user {
        _id
        email
        priorRuns {
          runtime
          score
          targetNumber
        }
        priorRuns {
          datePlayed
        }
        statistics {
          avgScore
          highScore
          runNumber
        }
        username
      }
    }
  }
  `;