import React from 'react';
import HompageContainer from './components/HomepageContainer.jsx';
function App() {
  return (
    <div className='min-h-screen bg-gradient-to-br from-pink-100 to-pink-200 flex flex-col items-center justify-center gap-6'>
      <h1 className='text-4xl font-bold text-pink-600 hover:text-pink-700 transition-colors duration-300 shadow-lg p-6 rounded-xl bg-white/80 backdrop-blur-sm'>
        pink fairy armadillos
      </h1>
      <button
        onClick={() => (window.location.href = '/auth/google')}
        className='flex items-center gap-3 bg-white text-gray-700 px-6 py-3 rounded-lg shadow-lg 
          hover:shadow-xl transition-all duration-300 font-medium
          hover:bg-gray-50 active:bg-gray-100'
      >
        Sign in with Google
      </button>
      <HompageContainer />
    </div>
  );
}

export default App;
