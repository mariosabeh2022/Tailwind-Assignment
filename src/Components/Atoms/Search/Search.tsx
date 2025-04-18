import { SearchProps } from "./Search.type"
const Search=({ label,onChange }:SearchProps)=>{
    return (
        <input type="text"
               className="mt-8 ml-8 text-black px-4 py-2 border border-gray-300 rounded-sm"
               placeholder="Search users..."
               onChange={onChange}
               value={label}
        />
    )
}
export default Search