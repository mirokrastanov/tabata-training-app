import React from 'react';
import InactiveBtn from './inactiveBtn';
import ActiveBtn from './ActiveBtn';
import { usePage } from '../../contexts/PageContext';

function VBtn2Separators({ text, lHandler, rHandler, check = false, rIcon, lIcon }) {
    if (!text) {
        const { location } = usePage();

        switch (location.pathname) {
            case '/user/signup': text = 'Sign Up'; lIcon ? rIcon = 'signup' : null; break;
            case '/user/signin': text = 'Sign In'; lIcon ? rIcon = 'signin' : null; break;
            case '/workouts/create': text = 'Confirm'; lIcon ? rIcon = 'yes' : null; break;
            default: text = 'Settings'; break;
        }
    }

    return (
        <div className="flex flex-row flex-nowrap justify-between my-6">
            <ActiveBtn square={true} handler={lHandler} iconOnly={lIcon} />
            <p className="py-2 text-xl text-gray-800">|</p>

            {check ? (<InactiveBtn left87={true} />) : (<>
                {lIcon
                    ? (<ActiveBtn left87={true} icon={true} handler={lHandler} text={'Use Discord'} />)
                    : (<ActiveBtn icon={false} text={text} left87={true} btnType={'submit'} />)}
            </>)}

            <p className="py-2 text-xl text-gray-800">|</p>
            <ActiveBtn square={true} handler={rHandler} iconOnly={rIcon} />
        </div>
    )
}

export default VBtn2Separators;