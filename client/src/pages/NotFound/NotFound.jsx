import './NotFound.css';
import { Link } from 'react-router-dom';

function NotFound() {
    return (
        <div id="not-found-ctr" className="flex flex-col items-center justify-center pb-10 h-[calc(100%-3.5rem)] text-center text-gray-800 bg-gray-100 rounded-b-lg">
            <h1 className="text-8xl font-bold">404</h1>
            <h2 className="text-2xl mt-4">Page Not Found</h2>
            <p className="text-lg mt-2 px-4">Sorry, the page you are looking for does not exist.</p>

            <Link to="/" className="inline-block mt-8 px-8 py-4 bg-purple-900 text-white text-lg font-semibold rounded-lg shadow-md hover:bg-purple-600">Home</Link>
        </div>
    )
}

export default NotFound;