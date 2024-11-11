import React, { useEffect, useState } from 'react';
import HomepageContainer from './pages/HomepageContainer.jsx';

const GoogleSignInButton = () => {
  return (
    <button
      onClick={() =>
        (window.location.href = 'http://localhost:3000/auth/google')
      }
      className='flex items-center gap-3 bg-white text-gray-600 px-6 py-3 rounded-lg shadow-md
        hover:shadow-lg transition-all duration-300 font-medium border border-gray-200
        hover:bg-gray-50 active:bg-gray-100'
    >
      <svg
        xmlns='http://www.w3.org/2000/svg'
        viewBox='0 0 24 24'
        className='w-5 h-5'
      >
        <path
          d='M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z'
          fill='#4285F4'
        />
        <path
          d='M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z'
          fill='#34A853'
        />
        <path
          d='M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z'
          fill='#FBBC05'
        />
        <path
          d='M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z'
          fill='#EA4335'
        />
      </svg>
      Continue with Google
    </button>
  );
};

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Check authentication status when component mounts
    fetch('http://localhost:3000/auth/status', {
      credentials: 'include',
    })
      .then((res) => res.json())
      .then((data) => {
        console.log('Auth data:', data);
        setIsAuthenticated(data.authenticated);
        setUser(data.user);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error checking auth status:', err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className='min-h-screen bg-gradient-to-br from-pink-100 to-pink-200 flex flex-col items-center justify-center'>
        <div className='text-2xl text-pink-600'>Loading...</div>
      </div>
    );
  }

  // Create initials as fallback
  const getInitials = () => {
    const firstName = user?.authUser?.firstName || '';
    const lastName = user?.authUser?.lastName || '';
    return `${firstName.charAt(0)}${lastName.charAt(0)}`;
  };

  return (
    <div className='min-h-screen bg-gradient-to-br from-pink-100 to-pink-200 flex flex-col items-center justify-center gap-6'>
      <h1 className='text-4xl font-bold text-pink-600 hover:text-pink-700 transition-colors duration-300 shadow-lg p-6 rounded-xl bg-white/80 backdrop-blur-sm'>
        ArmaDollar Saver
      </h1>

      {!isAuthenticated ? (
        <GoogleSignInButton />
      ) : (
        <>
          <div className='flex items-center gap-3 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-lg shadow-md'>
            <div className='relative w-8 h-8'>
              <img
                src={user?.authUser?.profilePhoto}
                alt={user?.authUser?.displayName}
                className='absolute inset-0 w-full h-full rounded-full border border-pink-200 object-cover'
                referrerPolicy='no-referrer'
              />
            </div>
            <span className='text-sm text-gray-600'>
              {user?.authUser?.displayName}
            </span>
          </div>

          <HomepageContainer userData={user} />

          <button
            onClick={() =>
              (window.location.href = 'http://localhost:3000/auth/logout')
            }
            className='mt-4 bg-pink-500 text-white px-6 py-2 rounded-lg shadow-lg 
              hover:bg-pink-600 transition-colors duration-300'
          >
            Sign Out
          </button>
        </>
      )}
    </div>
  );
}

export default App;

// import React from 'react';
// import HomepageContainer from './pages/HomepageContainer.jsx';
// function App() {
// 	return (
// 		<div className='min-h-screen bg-gradient-to-br from-pink-100 to-pink-200 flex flex-col items-center justify-center gap-6'>
// 			<h1 className='text-4xl font-bold text-pink-600 hover:text-pink-700 transition-colors duration-300 shadow-lg p-6 rounded-xl bg-white/80 backdrop-blur-sm'>
// 				pink fairy armadillos
// 			</h1>
// 			<button
// 				onClick={() => (window.location.href = '/auth/google')}
// 				className='flex items-center gap-3 bg-white text-gray-700 px-6 py-3 rounded-lg shadow-lg
//           hover:shadow-xl transition-all duration-300 font-medium
//           hover:bg-gray-50 active:bg-gray-100'
// 			>
// 				Sign in with Google
// 			</button>
// 			<HompageContainer />
// 		</div>
// 	);
// }

// export default App;
