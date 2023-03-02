import {AiOutlinePlusCircle} from "react-icons/ai"
import {AiOutlineMinusCircle} from "react-icons/ai"

export default function ButtonDropdownSub({handleShow ,show}) {
    return(
        <span>
            {
                show ?
                <AiOutlineMinusCircle  />
                :
                <AiOutlinePlusCircle  />
            }
        </span>
    )
}