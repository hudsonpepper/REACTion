import { Navigate, useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { LineChart } from '@mui/x-charts/LineChart';

import { QUERY_USER, QUERY_ME } from '../utils/queries';

import Auth from '../utils/auth';

const Profile = () => {
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

  return (
    <div>
      <div className="flex-row justify-center mb-3">
        <h2 className="col-12 col-md-10 bg-dark text-light p-3 mb-5">
          Viewing {userParam ? `${user.username}'s` : 'your'} profile.
        </h2>

        <div className="col-12 col-md-10 mb-5 flex-row flex-wrap-reverse justify-around">
          <div className='col-10 col-md-6 mb-12 profile-boxes'>
            <h1>Run Details</h1>
            {/* user.priorRuns[selected] SHOULD GO WHERE EACH CURLY BRACE IS */}
             <div className="flex-row justify-evenly">
              <div>
                <h2>Date Played</h2>
                <p>{}Example Date</p>
              </div>
              <div>
                <h2>Run Time</h2>
                <p>{}Seconds</p>
              </div>
              <div>
                <h2>Targets Hit</h2>
                <p>{}10</p>
              </div>
              <div>
                <h2>SCORE</h2>
                <p>{}110</p>
              </div>
             </div>
          </div>
          <div className='col-10 col-md-4 mb-12 profile-boxes'>
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
                { data: [1,2,3,4,5], 
                  scaleType: 'point',
                  label: 'Attempt #'
                }]}
              series={[{ data: [90,70,100,85,110], label: 'Score', area: true, color: '#373F51'}]}
              height={600}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
