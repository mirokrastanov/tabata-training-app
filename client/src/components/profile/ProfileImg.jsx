import React from 'react';

function ProfileImg({ dUser }) {
    const imgClasses = 'h-[70px] w-[70px] rounded-full max-custom-mq-500:w-[90px] max-custom-mq-500:h-[90px] max-custom-mq-300:w-full max-custom-mq-300:h-auto max-custom-mq-300:p-0';

    return (<>
        <div className="bg-white shadow-md rounded-lg min-w-[50%] max-w-4xl p-2 py-4 flex flex-wrap justify-center items-center gap-5 max-md:w-full max-custom-mq-300:" data-id={dUser?._id}>
            <div className="w-fit h-full rounded-full shadow-xl">

                {dUser.profilePic && <img src={dUser.profilePic} className={`${imgClasses} p-2 border`} />}

                {dUser?.avatarId && dUser?.avatarId != '' && (
                    <img src={`https://cdn.discordapp.com/avatars/${dUser.discordId}/${dUser.avatarId}`}
                        className={`${imgClasses} p-2 border`} />
                )}

                {dUser?.avatarId == '' && (
                    <img src={'/src/assets/user.png'} className={`${imgClasses}`} />
                )}

            </div>
            <div className="px-2 flex flex-col max-custom-mq-500:hidden">
                <p className="text-gray-600 text-md max-custom-mq-300:text-sm">username</p>
                <h2 className="text-gray-800 font-bold text-3xl max-custom-mq-300:text-xl">{dUser?.username}</h2>
            </div>
        </div>

        <div className="bg-white shadow-md rounded-lg min-w-[50%] max-w-4xl p-2 py-4 mt-4 flex flex-wrap justify-center items-center gap-5 custom-mq-500:hidden max-custom-mq-500:w-full">
            <div className="px-2 flex flex-col">
                <p className="text-gray-600 text-md max-custom-mq-300:text-sm">username</p>
                <h2 className="text-gray-800 font-bold text-3xl max-custom-mq-300:text-xl">{dUser?.username}</h2>
            </div>
        </div>
    </>)
}

export default ProfileImg;