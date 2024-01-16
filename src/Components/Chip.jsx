import React from 'react'
import { IoMdClose } from "react-icons/io";

const Chip = ({ id, img, name, removeChip }) => {

    const handleRemoveChip = () => {
        removeChip(id);
    }

    return (
        <div className="chip h-10 bg-green-200 rounded-full flex flex-row justify-between items-center">
            <img src={img} alt="profile" className="size-10 rounded-full" />
            <p className="h-10 flex justify-center items-center px-2">{name}</p>
            <IoMdClose size={24} className="mr-2 cursor-pointer" onClick={handleRemoveChip} />
        </div>
    )
}

export default Chip
