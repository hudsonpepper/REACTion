import { useState } from 'react';
import { Navigate, useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { LineChart } from '@mui/x-charts/LineChart';

import { QUERY_USER, QUERY_ME } from '../utils/queries';

import Auth from '../utils/auth';

const Profile = () => {
  const [selectedAttempt, setSelectedAttempt] = useState(1);

  const { username: userParam } = useParams();

  const { loading, data } = useQuery(userParam ? QUERY_USER : QUERY_ME, {
    variables: { username: userParam },
  });

  const user = data?.me || data?.user || {};
  if (
    Auth.loggedIn() && 
    /* Run the getProfile() method to get access to the unencrypted token value in order to retrieve the user's username, and compare it to the userParam variable */
    Auth.getProfile().authenticatedPerson.username === userParam
  ) {
    return <Navigate to="/me" />;
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  console.log(data)

  if (!user?.username) {
    return (
      <h4>
        You need to be logged in to see this. Use the navigation links above to
        sign up or log in!
      </h4>
    );
  }

  const graphDataY = [];
  const graphDataX = [];
  for (let i = 0; i < user.priorRuns.length; i++) {
    graphDataY.push(user.priorRuns[i].score);
    graphDataX.push(i + 1);
  }

  const dropdownClicker = (e) => {
    e.preventDefault();
    setSelectedAttempt(e.target[Object.keys(e.target)[1]].value);
  }

  const renderDropdownOptions = (attemptNum) => {
    return <li><a value={attemptNum} className={selectedAttempt==attemptNum ? "text-red-900 font-bold": "text-black"} onClick={dropdownClicker}>Run #{attemptNum}</a></li>;
  }

  return (
    <div>
      <div className="flex-row justify-center mb-3">
        <h2 className="col-12 col-md-10 bg-dark text-light p-3 mb-5">
          Viewing {userParam ? `${user.username}'s` : 'your'} profile.
        </h2>

        <div className="col-12 col-md-10 mb-5 flex-row flex-wrap-reverse justify-around">
          <div className='col-10 col-md-8 mb-12 profile-boxes'>
            <div className="flex-row justify-evenly">
              <h1>Run Details</h1>
              <details className="dropdown dropdown-top">
                    <summary className="m-1 dropdown-btn btn">Select Run</summary>
                    <ul className="absolute p-2 shadow menu dropdown-content z-[1] bg-white-100 bg-opacity-100 rounded-box w-52">
                        {graphDataX.map(renderDropdownOptions)}
                    </ul>
                </details>
            </div>
            {/* user.priorRuns[selectedAttempt - 1] SHOULD GO WHERE EACH CURLY BRACE IS */}
             <div className="flex-row justify-evenly">
              <div>
                <h2>Date Played</h2>
                <p>{user.priorRuns ? user.priorRuns[selectedAttempt - 1].datePlayed : null}</p>
              </div>
              <div>
                <h2>Run Time</h2>
                <p>{user.priorRuns ? user.priorRuns[selectedAttempt - 1].runtime / 1000 : null} sec</p>
              </div>
              <div>
                <h2>Targets Hit</h2>
                <p>{user.priorRuns ? user.priorRuns[selectedAttempt - 1].targetNumber : null }</p>
              </div>
              <div>
                <h2>Difficulty</h2>
                <p>{user.priorRuns ? user.priorRuns[selectedAttempt - 1].difficultyModifier : null}</p>
              </div>
              <div>
                <h2>SCORE</h2>
                <p>{user.priorRuns ? user.priorRuns[selectedAttempt - 1].score : null}</p>
              </div>
             </div>
          </div>
          <div className='col-10 col-md-3 mb-12 profile-boxes'>
            <h1>User Info</h1>
            <div className='flex-row justify-between'>
              <p>Username:</p>
              <p>{user.username}</p>
            </div>
            <div className='flex-row justify-between'>
              <p>Email:</p>
              <p>{user.email}</p>
            </div>
            <div className='flex-row justify-between'>
              <p>Completed Runs:</p>
              <p>{user.priorRuns.length}</p>
            </div>
          </div>
        </div>
        {!userParam && (
          <div
            className="col-12 col-md-10 mb-3 p-3 graph-box"
            style={{ border: '1px dotted #1a1a1a' }}
          >
            <h1>Progress Tracker</h1>
            <h2>Mouse over the data points, then select it from the dropdown above for details on each attempt.</h2>
            {/* xAxis is date played, so change scale type to 'time' to take date objects once you load in the data */}
            {/* yAxis should be scores */}
            <LineChart 
              xAxis={[
                { data: graphDataX, 
                  scaleType: 'point',
                  label: 'Attempt #'
                }]}
              series={[{ data: graphDataY, label: 'Score', area: true, color: '#373F51'}]}
              height={600}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
