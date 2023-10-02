import { IoPeople, IoPerson } from "react-icons/io5";
import { RiTeamFill } from 'react-icons/ri'







export default function PlayerCard() {
    return(
        <div className="flex flex-row bg-white rounded-xl p-2 border border-gray-300 gap-2">
            <div className="flex flex-row gap-2">
                <div className="flex flex-shrink-0 aspect-square w-32 h-32 rounded-full bg-gray-300 p-2 text-8xl items-center justify-center">
                    <IoPerson/>
                </div>
                <div className="flex flex-col justify-center">
                    <label>Sharkman</label>
                    <label>Turkey</label>
                    <label>RB, LW</label>
                </div>
            </div>
            <div className="flex flex-row border-l border-l-gray-300 px-2 gap-2">
                <div className="flex flex-shrink-0 aspect-square w-32 h-32 rounded-full bg-gray-300 p-2 text-8xl items-center justify-center">
                    <RiTeamFill/>
                </div>
                <div className="flex flex-col justify-center">
                    <label>Lasisx</label>
                    <label>Turkey</label>
                </div>
            </div>
        </div>
    )
}