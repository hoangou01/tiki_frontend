import { Container } from "react-bootstrap"
import { NavLink } from "react-router-dom"

const ProfileMenu = ()=>{
    const renderProfileMenu = (
        <>
            <div className="profile_menu">
                <ul>
                    <NavLink className='nav-link text-dark' to={'/customer/info'}>Thông tin khách hàng</NavLink>
                    <NavLink className='nav-link text-dark' to={'/customer/order'}>Đơn hàng</NavLink>
                </ul>
            </div>
        </>
    )
    return (
        <>
            {renderProfileMenu}
        </>
    )
}
export default ProfileMenu