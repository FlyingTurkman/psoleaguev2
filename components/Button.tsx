import { ButtonHTMLAttributes } from "react";
import { AiOutlineLoading3Quarters } from 'react-icons/ai'



interface ButtonInterface extends ButtonHTMLAttributes<HTMLButtonElement> {
    loading?: boolean
}



export default function Button({onClick, loading, className, children, ...props}: ButtonInterface) {
    if (!loading) {
        return(
            <button {...props} className={className} onClick={onClick}>
                {children}
            </button>
        )
    } else {
        return(
            <button {...props} className={`${className} items-center justify-center flex text-xl`} onClick={() => { return }}>
                <div className="animate-spin">
                    <AiOutlineLoading3Quarters/>
                </div>
            </button>
        )
    }

}