import React from 'react';
import './Home.css';
import { Link } from 'react-router-dom';

const Home = () => {


    return (
        <div className="bg-gray-100 flex flex-col justify-between w-full h-[calc(100%-3.5rem)] overflow-y-scroll rounded-b-lg">
            <header className="bg-purple-900 text-white py-6 shadow-lg">
                <div className="container mx-auto px-6 flex justify-between items-center">
                    <h1 className="text-3xl font-bold">Tabata Training</h1>
                    <nav>
                        <ul className="flex space-x-6">
                            <li><Link to="#features" className="hover:text-gray-300">Features</Link></li>
                            <li><Link to="#how-it-works" className="hover:text-gray-300">How It Works</Link></li>
                            <li><Link to="#contact" className="hover:text-gray-300">Contact</Link></li>
                        </ul>
                    </nav>
                </div>
            </header>

            <main className="flex-grow">
                <section className="bg-white py-20">
                    <div className="container mx-auto px-6 text-center">
                        <h2 className="text-4xl font-bold text-gray-800">Get Fit with Tabata Training</h2>
                        <p className="text-gray-600 mt-4">
                            High-intensity interval training to maximize your fitness level.
                        </p>
                        <a
                            href="#download"
                            className="inline-block mt-8 px-8 py-4 bg-purple-900 text-white text-lg font-semibold rounded-lg shadow-md hover:bg-purple-600"
                        >
                            Get Started
                        </a>
                    </div>
                </section>

                <section id="features" className="bg-gray-50 py-20">
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
                            <div className="w-full md:w-1/2 lg:w-1/3 px-4 py-6">
                                <div className="flex items-center">
                                    <div className="w-12 h-12 bg-purple-900 text-white flex items-center justify-center rounded-full">
                                        <span className="text-lg font-bold">1</span>
                                    </div>
                                    <p className="ml-4 text-gray-600">
                                        Choose your workout routine from our list or create your own.
                                    </p>
                                </div>
                            </div>
                            <div className="w-full md:w-1/2 lg:w-1/3 px-4 py-6">
                                <div className="flex items-center">
                                    <div className="w-12 h-12 bg-purple-900 text-white flex items-center justify-center rounded-full">
                                        <span className="text-lg font-bold">2</span>
                                    </div>
                                    <p className="ml-4 text-gray-600">
                                        Set the duration for each exercise and rest period.
                                    </p>
                                </div>
                            </div>
                            <div className="w-full md:w-1/2 lg:w-1/3 px-4 py-6">
                                <div className="flex items-center">
                                    <div className="w-12 h-12 bg-purple-900 text-white flex items-center justify-center rounded-full">
                                        <span className="text-lg font-bold">3</span>
                                    </div>
                                    <p className="ml-4 text-gray-600">
                                        Start your workout and let the app guide you through each interval.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <section id="contact" className="bg-gray-50 py-20">
                    <div className="container mx-auto px-6 text-center">
                        <h2 className="text-3xl font-bold text-gray-800">Contact Us</h2>
                        <p className="text-gray-600 mt-4">Have questions or feedback? We'd love to hear from you!</p>
                        <form className="mt-8 max-w-md mx-auto">
                            <input
                                type="email"
                                placeholder="Your Email"
                                className="w-full p-4 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-900"
                            />
                            <textarea
                                placeholder="Your Message"
                                className="w-full p-4 mt-4 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-900"
                                rows="5"
                            ></textarea>
                            <button
                                type="submit"
                                className="w-full mt-6 px-8 py-4 bg-purple-900 text-white text-lg font-semibold rounded-lg shadow-md hover:bg-purple-600"
                            >
                                Send Message
                            </button>
                        </form>
                    </div>
                </section>
            </main>

            <footer className="bg-purple-900 text-white py-6">
                <div className="container mx-auto px-6 text-center">
                    <p>&copy; 2024 Tabata Training. All rights reserved.</p>
                </div>
            </footer>
        </div>
    );
};

export default Home;
