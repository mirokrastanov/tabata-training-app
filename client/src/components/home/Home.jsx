import React, { useEffect } from 'react';
import './Home.css';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import toast from 'react-hot-toast';
import { FaArrowUpRightFromSquare } from "react-icons/fa6";

const Home = () => {
    const { user } = useAuth();
    const [searchParams] = useSearchParams();
    const referrer = searchParams.get('referrer');
    const navigate = useNavigate();

    useEffect(() => {
        if (referrer && user) {
            navigate('/');
            toast.success(`Welcome to Tabata Training!`);
        }
    }, []);


    return (
        <div className="bg-gray-100 flex flex-col justify-between w-full h-[calc(100%-3.5rem)] overflow-y-scroll rounded-b-lg">
            {user
                ? (
                    <article className="flex-grow bg-slate-400">
                        <section className="bg-white py-20">
                            <div className="container mx-auto px-6 text-center">
                                <h2 className="text-4xl font-bold text-gray-800">Welcome back,
                                    <Link to={'/user/profile'} className="a-left text-purple-500 font-bold hover:text-purple-700 transition-all hover:mx-0 hover:px-2">
                                        {user?.username}</Link>!</h2>
                                <p className="text-gray-600 mt-4">
                                    Continue where you left off or start a new workout session.
                                </p>
                                <div className="flex justify-center mt-8">
                                    <Link to="/workouts" className="mx-2 px-8 py-4 bg-purple-900 text-white text-lg font-semibold rounded-lg shadow-md hover:bg-purple-600">
                                        Start New Workout
                                    </Link>
                                    {/* TODO: store and render from local storage - create component */}
                                    <Link to="/workout/history" className="mx-2 px-8 py-4 bg-purple-900 text-white text-lg font-semibold rounded-lg shadow-md hover:bg-purple-600">
                                        View Progress
                                    </Link>
                                </div>
                            </div>
                        </section>

                        <section id="recent-activity" className="bg-gray-100 py-20">
                            <div className="container mx-auto px-6">
                                <h2 className="text-3xl font-bold text-gray-800">Your Activity</h2>
                                <div className="mt-10 flex flex-wrap justify-center">
                                    <div className="w-full sm:w-1/2 lg:w-1/3 px-4 py-6">
                                        <div className="bg-white p-6 rounded-lg shadow-lg">
                                            <h3 className="text-2xl font-semibold text-gray-800">Last Workout</h3>
                                            <p className="text-gray-600 mt-2">Completed on [Date].</p>
                                        </div>
                                    </div>
                                    <div className="w-full sm:w-1/2 lg:w-1/3 px-4 py-6">
                                        <div className="bg-white p-6 rounded-lg shadow-lg">
                                            <h3 className="text-2xl font-semibold text-gray-800">Sets Completed</h3>
                                            <p className="text-gray-600 mt-2">You've completed [amount] sets!</p>
                                        </div>
                                    </div>
                                    <div className="w-full sm:w-1/2 lg:w-1/3 px-4 py-6">
                                        <div className="bg-white p-6 rounded-lg shadow-lg">
                                            <h3 className="text-2xl font-semibold text-gray-800">Workout time</h3>
                                            <p className="text-gray-600 mt-2">You've spent [amount] hours working out.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="flex justify-center mt-8">
                                <Link to="/workouts/statistics" className="mx-2 px-8 py-4 bg-purple-900 text-white text-lg font-semibold rounded-lg shadow-md hover:bg-purple-600">
                                    Full Statistics
                                </Link>
                            </div>
                        </section>

                        <section className="bg-white py-20">
                            <div className="container mx-auto px-6 text-center">
                                <h2 className="text-4xl font-bold text-gray-800">Stay Motivated</h2>
                                <p className="text-gray-600 mt-4">
                                    Keep pushing your limits and achieve your fitness goals.
                                </p>
                                <Link target='_blank' to="https://www.reddit.com/r/Fitness/" className="mt-8 px-8 py-4 bg-purple-900 text-white text-lg font-semibold rounded-lg shadow-md hover:bg-purple-600 flex flex-nowrap justify-center items-center w-fit mx-auto">
                                    Join the Community 
                                    <FaArrowUpRightFromSquare className="ml-2" />
                                </Link>
                            </div>
                        </section>
                    </article>
                )
                : (
                    <article className="flex-grow">
                        <section className="bg-white py-20">
                            <div className="container mx-auto px-6 text-center">
                                <h2 className="text-4xl font-bold text-gray-800">Get Fit with Tabata Training</h2>
                                <p className="text-gray-600 mt-4">
                                    High-intensity interval training to maximize your fitness level.
                                </p>
                                <Link to="/user/signup" className="inline-block mt-8 px-8 py-4 bg-purple-900 text-white text-lg font-semibold rounded-lg shadow-md hover:bg-purple-600">
                                    Get Started
                                </Link>
                            </div>
                        </section>

                        <section id="features" className="bg-gray-100 py-20">
                            <div className="container mx-auto px-6 text-center">
                                <h2 className="text-3xl font-bold text-gray-800">Features</h2>
                                <div className="mt-10 flex flex-wrap justify-center">
                                    <div className="w-full sm:w-1/2 lg:w-1/3 px-4 py-6">
                                        <div className="bg-white p-6 rounded-lg shadow-lg">
                                            <h3 className="text-2xl font-semibold text-gray-800">Custom Workouts</h3>
                                            <p className="text-gray-600 mt-2">
                                                Tailor your workout routines to match your fitness goals.
                                            </p>
                                        </div>
                                    </div>
                                    <div className="w-full sm:w-1/2 lg:w-1/3 px-4 py-6">
                                        <div className="bg-white p-6 rounded-lg shadow-lg">
                                            <h3 className="text-2xl font-semibold text-gray-800">Progress Tracking</h3>
                                            <p className="text-gray-600 mt-2">
                                                Monitor your improvement with detailed statistics.
                                            </p>
                                        </div>
                                    </div>
                                    <div className="w-full sm:w-1/2 lg:w-1/3 px-4 py-6">
                                        <div className="bg-white p-6 rounded-lg shadow-lg">
                                            <h3 className="text-2xl font-semibold text-gray-800">Timer & Alerts</h3>
                                            <p className="text-gray-600 mt-2">
                                                Stay on track with integrated timers and alerts.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>

                        <section id="how-it-works" className="bg-white py-20">
                            <div className="container mx-auto px-6">
                                <h2 className="text-3xl font-bold text-center text-gray-800">How It Works</h2>

                                <div className="mt-10 flex flex-wrap justify-center">
                                    {[{
                                        number: 1,
                                        text: "Choose your workout routine from our list or create your own."
                                    },
                                    {
                                        number: 2,
                                        text: "Set the duration for each exercise and rest period."
                                    },
                                    {
                                        number: 3,
                                        text: "Start your workout and let the app guide you through each interval."
                                    }
                                    ].map((step, index) => (
                                        <div key={index} className="w-full md:w-1/2 lg:w-1/3 flex">
                                            <div className="flex items-center">
                                                <div className="ml-2 bg-purple-900 text-white flex items-center justify-center rounded-full">
                                                    <span className="text-lg font-bold w-12 h-12 flex items-center justify-center">{step.number}</span>
                                                </div>
                                                <div className="ml-2 text-gray-600 py-6">
                                                    <p>{step.text}</p>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                            </div>
                        </section>

                        <section className="bg-gray-100 py-20">
                            <div className="container mx-auto px-6 text-center">
                                <h2 className="text-4xl font-bold text-gray-800">The time to get fit is now!</h2>
                                <p className="text-gray-600 mt-4">
                                    Sign up for free or sign in if you already have an account.
                                </p>
                                <Link to="/user/signup" className="inline-block mt-8 mx-2 px-8 py-4 bg-purple-900 text-white text-lg font-semibold rounded-lg shadow-md hover:bg-purple-600">
                                    Sign Up
                                </Link>
                                <Link to="/user/signin" className="inline-block mt-8 mx-2 px-8 py-4 bg-purple-900 text-white text-lg font-semibold rounded-lg shadow-md hover:bg-purple-600">
                                    Sign In
                                </Link>
                            </div>
                        </section>
                    </article>
                )}


            <footer className="bg-purple-900 text-white py-6">
                <div className="container mx-auto px-6 text-center">
                    <p>&copy; 2024 Tabata Training. Source code
                        <Link to="https://github.com/mirokrastanov"
                            className="text-cyan-200 hover:text-cyan-400" target="_blank"> here</Link>.
                    </p>
                </div>
            </footer>
        </div>
    );
};

export default Home;
