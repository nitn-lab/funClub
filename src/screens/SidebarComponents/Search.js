import React, { useState } from "react";
import { Modal } from "react-responsive-modal";
import { FaTimes } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { IoIosSearch } from "react-icons/io";

const designersList = [
    { _id: 1, name: "John Doe" },
    { _id: 1, name: "Jane Smith" },
    { _id: 1, name: "Emily Brown" },
];

const SearchModal = ({ isOpen, onClose }) => {
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState("");
    const [searchResults, setSearchResults] = useState(designersList);

    const handleSearch = (e) => {
        const value = e.target.value;
        setSearchTerm(value);

        if (value.length > 0) {
            const filteredResults = designersList.filter((designer) =>
                designer.name.toLowerCase().includes(value.toLowerCase())
            );
            setSearchResults(filteredResults);
        } else {
            setSearchResults(designersList);
        }
    };

    return (
        <>

            <Modal
                onClose={onClose}
                open={isOpen}
                center
                closeIcon={
                    <FaTimes className="text-xl p-1 float-end bg-black text-white rounded-full" />
                }
                classNames={{
                    overlay: { background: "rgba(0, 0, 0, 0.462)" },
                    modal: "customSearchModal",
                }}
            >
                <div className="flex items-center gap-2 py-4 pl-3">
                    <IoIosSearch style={{ fontSize: '1.5rem' }} />
                    <h3 className=" text-xl">Search</h3>
                </div>
                <div className="">
                    <input
                        type="text"
                        value={searchTerm}
                        onChange={handleSearch}

                        autoFocus
                        className="w-full border-none outline-none p-2 bg-black"
                    />

                    {searchResults.length > 0 && (
                        <ul className="mt-4">
                            {searchResults.map((designer, index) => (
                                <li key={index} className="flex items-center gap-3 px-6 py-4 hover:bg-fuchsia-900 transition-all cursor-pointer" onClick={() => navigate(`/dashboard/user/${designer._id}`)}>
                                    <img src={designer.image} alt={designer.name} className="w-8 h-8 rounded-full bg-black" />
                                    <span>{designer.name}</span>
                                </li>
                            ))}
                        </ul>
                    )
                    }
                    {/* {searchTerm === "" && <div className="flex items-center justify-center h-64">
                        <p>Write something to get search results.</p>
                    </div>} */}

                    {searchTerm !== "" && searchResults.length == 0 &&
                        <div className="flex items-center justify-center h-64">
                            <div>
                                <p>No users found</p>
                                <button className="bg-black px-3 py-1 mt-2 rounded-lg" onClick={() => navigate(`/register`)}>
                                    Create Profile
                                </button>
                            </div>
                        </div>}
                </div>
            </Modal>
        </>
    );
};

export default SearchModal;