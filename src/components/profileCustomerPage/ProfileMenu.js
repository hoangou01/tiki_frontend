import { Container } from "react-bootstrap"
import { NavLink } from "react-router-dom"

const ProfileMenu = ()=>{
    const renderProfileMenu = (
        <>
            <div className="profile_menu">
                <ul>
                    <NavLink className='nav-link text-dark' to={`/customers/${1}/profile`}>Thông tin khách hàng</NavLink>
                    <NavLink className='nav-link text-dark' to={`/customers/${1}/orders`}>Đơn hàng</NavLink>
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