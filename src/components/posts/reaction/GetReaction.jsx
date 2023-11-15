import axios from "axios";
import { useContext } from "react";
import { useState } from "react";
import { useEffect } from "react";
import { BASE_URL } from "../../../constants/api";
import AuthContext from "../../../context/AuthContext";

export default function GetPostReaction(props) {
    const [reactions, setReactions] = useState([]);
    const [ setLoader] = useState(true);
    const [ setIsError] = useState(null);
    const [auth] = useContext(AuthContext)
    const [submitting, setSubmitting] = useState(false);

    const id = props.id;
   
    const options = {
        headers: {
            Authorization: `Bearer ${auth.accessToken}`
        }
    }
    const url = BASE_URL + `/posts/${id}?_reactions=true`;


    useEffect(() => {
        async function getReaction() {
            try {
                const response = await axios.get(url, options)
                const reactionList = response.data.reactions
                setReactions(reactionList)
            } catch (error) {

            } finally {
                setLoader(false)
            }
        }
        getReaction()
    }, )



    async function isChecked(e) {
        const checked = e.target.checked;
        const checkedName = e.target.name;
        const checkedPostId = e.target.id;
        let checkedValue = e.target.value;

        if (checked === true) {
            checkedValue++
         
        }
        const data = {
            symbol: checkedName,
            postId: checkedPostId,
            count: `${checkedValue}`
        };
        const reactUrl = BASE_URL + `/posts/${checkedPostId}/react/${checkedName}`
        try {
            const response = await axios.put(reactUrl, data, options);
            
            if (response.status === 200) {
                setSubmitting(true);
            }
        } catch (error) {
            const errorMessage = <div className="error">{error.response.data.errors[0].message}</div>;
            setIsError(errorMessage);
            console.log(error)

        }

    }


    const reactSymbol = [
        "😇",
        "😛",
        "🧡",
        "👍"
    ]



    return (
        <>
            {reactSymbol.map((react) => {
                let icons = react;
                let count
                reactions.forEach((symbol) => {
                    let symbols = symbol.symbol
                    if (symbols === react) {
                        icons = symbols;
                        count = symbol.count
                     
                    }
                })
                return (
                    <div key={icons} className="checkbox_container">
                        <label className="label_container" htmlFor={icons}>{react}
                            <input type="checkbox" id={props.id} value={count} name={icons} onChange={isChecked}  disabled={submitting}/>
                            <span className="checkmark"></span>
                        </label>
                    </div>
                )
            })
            }

        </>
    )
}