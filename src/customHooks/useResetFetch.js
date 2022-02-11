import {useEffect, useState} from "react";
import UsefulFunctions from "../functions/UsefulFunctions";

/**
 * Hook that trigger when the useState reset changed. It was created to split the behave of the search button and the
 * reset button because they are in the same component but they have different behave.
 * @param data
 * @param tableConfig
 * @param setTableConfig
 * @param setSearchText
 * @param bool
 * @param throwFetch
 * @param setObjectList
 * @param objectList
 * @returns {{resetState: unknown, setResetState: (value: unknown) => void}}
 */
const useResetFetch = (data, tableConfig, setTableConfig, setSearchText, bool, throwFetch, setObjectList, objectList) => {
    const [resetState, setResetState] = useState(bool);

    const { getData } = UsefulFunctions()

    // triggered when the reset button has changed
    useEffect(() => {

        // variables useful to manage different simultaneously fetch
        const controller = new AbortController()
        const signal = controller.signal

        const getListObjects = async () => {
            return await getData(data.sortPath, data.orderPath, tableConfig, tableConfig.startPath, signal)
        }

        if(throwFetch) {
            // normal call because the reset() function in Header.js reset all the table settings
            getListObjects().then(r => {
                setTableConfig({
                    ...tableConfig,
                    list: r,
                })
                objectList !== [] && setObjectList(r)
            })
        }
        setSearchText('')

        return () => {
            // when this useEffect is thrown, first abort the previous fetch if it is still in calling
            controller.abort()
        }

    }, [resetState]);

    return { resetState, setResetState }
};

export default useResetFetch;