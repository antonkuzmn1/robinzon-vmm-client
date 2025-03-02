import {Link, useLocation} from "react-router-dom";
import {AccountCircle} from "@mui/icons-material";
import {useSelector} from "react-redux";
import {RootState} from "../../utils/store.ts";

const Navbar = () => {
    const location = useLocation();

    const deviceSize = useSelector((state: RootState) => state.device.size);

    const getLinkClass = (path: string) =>
        location.pathname === path
            ? "bg-gray-300 text-black p-4 w-full text-center"
            : "hover:bg-gray-300 text-black p-4 transition-colors duration-200 w-full text-center";

    return (
        <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-300 text-black">
            <div className="flex">
                <Link to="/view_vm_json.ps1" className={getLinkClass("/view_vm_json.ps1")}>
                    <div className="flex items-center justify-center space-x-2">
                        <AccountCircle sx={{color: 'black'}}/>
                        {deviceSize === 'Large' && <span>view_vm_json.ps1</span>}
                    </div>
                </Link>
            </div>
        </nav>
    );
};

export default Navbar;
