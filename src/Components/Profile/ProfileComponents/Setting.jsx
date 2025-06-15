
import { Link } from 'react-router-dom';
import CustomButton from '../../utilities/CustomButton';

const navLinks = [

    { to: '/user/editProfile', text: 'Edit Profile', icon: '✏️' },
    { to: '/user/editProfilePhoto', text: 'Edit Profile Photo', icon: '🖼️' },
    { to: '/user/updatePassword', text: 'Update Password', icon: '🔑' },
    { to: '/user/deleteAccount', text: 'Delete Account', icon: '🗑️' },
];

export default function Sidebar() {



    return (
        <div className='relative w-full h-auto flex  md:p-20 gap-16 pt-10 justify-center items-center  text-light font-bold tracking-wide flex-wrap '>
            {navLinks.map(({ to, text, icon }) => (
                <Link key={to} to={to}
                    className='rounded-[14px] bg-[#17181D] shadow-[inset_5px_-5px_5px_#090a0c,inset_-5px_5px_5px_#25262e] w-[350px] h-[200px] text-light gap-2  border-slate-300 relative group'>
                    <CustomButton >
                        <div className='text-5xl'>{icon}</div>
                        <span className='text-center text-3xl font-semibold mt-2'>
                            {text}
                        </span>

                    </CustomButton>
                </Link>
            ))
            }

        </div >
    );
}