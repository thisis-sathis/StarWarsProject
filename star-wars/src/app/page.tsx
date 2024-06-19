"use-client";
import React from 'react';
import PeopleDashboard from './pages/People';

const Home: React.FC = () => (
  <main className="p-24">
    <div className="font-mono main-container flex flex-col gap-10"> 
      <div className="flex flex-col gap-2.5">
      <h1 className="text-[20px] font-semibold"> Star Wars</h1>
        <p>Star wars is a great movie. Here you can find all the information about star wars.</p>
      </div>
      <PeopleDashboard />
    </div>
  </main>
);

export default Home;
