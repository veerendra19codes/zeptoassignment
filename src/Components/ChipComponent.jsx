import React, { useState, useEffect, useCallback } from 'react'
import Chip from './Chip'
import profile1 from "../assets/images/profile1.jpg"
import profile2 from "../assets/images/profile2.jpg"
import profile3 from "../assets/images/profile3.jpg"
import profile4 from "../assets/images/profile4.jpg"
import profile5 from "../assets/images/profile5.jpg"
import profile6 from "../assets/images/profile6.jpg"
import profile7 from "../assets/images/profile7.jpg"
import profile8 from "../assets/images/profile8.jpg"

const ChipComponent = () => {
    const [showOptions, setShowOptions] = useState(false);
    const [searchText, setSearchText] = useState("");
    const [selectedChips, setSelectedChips] = useState([]);

    const [options, setOptions] = useState([
        {
            id: 1,
            img: profile1,
            name: "Ken Alvarez",
            email: "ken@example.com"
        },
        {
            id: 2,
            img: profile2,
            name: "Tracy Bing",
            email: "tracy@example.com"
        }, {
            id: 3,
            img: profile3,
            name: "Bradley Wells",
            email: "bradley@example.com"
        }, {
            id: 4,
            img: profile4,
            name: "Soham Newman",
            email: "Soham@example.com"
        }, {
            id: 5,
            img: profile5,
            name: "Denise Hall",
            email: "denise.hall@example.com"
        }, {
            id: 6,
            img: profile6,
            name: "Calvin Jones",
            email: "calvinjones@example.com"
        },
        {
            id: 7,
            img: profile7,
            name: "Lelita George",
            email: "lelita.george@example.com"
        }, {
            id: 8,
            img: profile8,
            name: "Sam Will",
            email: "will.sam@example.com"
        },
    ]);

    const addChip = (opt) => {
        setSearchText("");
        setShowOptions(!showOptions);

        setOptions((prevOptions) => prevOptions.filter((option) => option.id !== opt.id));

        setSelectedChips((prevChips) => [
            ...prevChips, {
                id: opt.id,
                name: opt.name,
                email: opt.email,
                img: opt.img,
            }
        ])
    }

    const removeChip = useCallback((id) => {
        setShowOptions(!showOptions);
        setSelectedChips(prevChips => prevChips.filter((prevChip) => prevChip.id !== id));
        setOptions((prevOptions) => [
            ...prevOptions,
            ...selectedChips.filter((prevChip) => prevChip.id === id),
        ]);
        setSearchText('');
    }, [showOptions, selectedChips]);

    const filteredOptions = options.filter(
        (opt) => searchText.trim() === '' || opt.name.toLowerCase().includes(searchText.toLowerCase())
    );

    useEffect(() => {
        const handleBackspace = (event) => {
            if (event.key === 'Backspace' && searchText.trim() === '' && selectedChips.length > 0) {
                const lastSelectedChip = selectedChips[selectedChips.length - 1];
                removeChip(lastSelectedChip.id);
            }
        };

        document.addEventListener('keydown', handleBackspace);

        return () => {
            document.removeEventListener('keydown', handleBackspace);
        };
    }, [searchText, selectedChips, removeChip]);

    return (
        <div className="ChipComponent border-b-2 border-blue-600 w-[800px] min-h-[50px] flex flex-row flex-wrap mt-32 items-center gap-4 p-2">


            {selectedChips.map((chip, index) => {
                return (
                    <Chip
                        key={chip.id}
                        id={chip.id}
                        img={chip.img}
                        name={chip.name}
                        removeChip={() => removeChip(chip.id)}
                    />
                )
            })}

            <div className="parent relative flex flex-col justify-center items-centers">

                <input placeholder="Add new user" className="border-none outline-none h-10 " onFocus={() => setShowOptions(!showOptions)} onChange={(e) => setSearchText(e.target.value)} value={searchText} ></input>

                {showOptions ? (
                    <div className="options max-h-[250px] w-[450px] overflow-y-scroll z-10 absolute top-full left-0 shadow-md bg-white">

                        {
                            filteredOptions.map((opt) => {
                                return (
                                    <div key={opt.id} className="flex flex-row justify-evenly items-center h-[50px] w-full cursor-pointer hover:bg-gray-200" onClick={() => addChip(opt)}>
                                        <img src={opt.img} className="size-[40px] rounded-full" alt="profile" />
                                        <p className="flex justify-center items-center w-[150px]">{opt.name}</p>
                                        <p className="flex justify-center items-center text-gray-400 w-[200px]">{opt.email}</p>
                                    </div>
                                )
                            })
                        }
                    </div>
                ) : ""}

            </div>


        </div>
    )
}

export default ChipComponent
