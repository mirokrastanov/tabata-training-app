import React from 'react';
import InactiveBtn from './inactiveBtn';
import ActiveBtn from './activeBtn';
import { usePage } from '../../contexts/PageContext';

function VBtnSeparator({ text, lHandler, rHandler, check = false, rIcon, lIcon }) {
    if (!text) {
        const { location } = usePage();

        switch (location.pathname) {
            case '/user/signup': text = 'Sign Up'; break;
            case '/user/signin': text = 'Sign In'; break;
            default: text = 'Settings'; break;
        }
    }
    if (lIcon) rIcon = 'email';

    return (
        <div className="flex flex-row flex-nowrap justify-between my-6">
            {lIcon ? (<ActiveBtn left87={true} icon={true} handler={lHandler} text={'Use Discord'} />) : <>
                {check
                    ? (<InactiveBtn left87={true} />)
                    : (<ActiveBtn icon={false} text={text} left87={true} btnType={'submit'} />)
                }
            </>}
            <p className="py-2 text-xl text-gray-800">|</p>
            <ActiveBtn square={true} handler={rHandler} iconOnly={rIcon} />
        </div>
    )
}

export default VBtnSeparator;