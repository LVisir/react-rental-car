import UsefulFunctions from "../../functions/UsefulFunctions";
import React, {useEffect} from "react";
import Header from "../Header";
import {Container} from "react-bootstrap";
import CustomTable from "./CustomTable";
import BookingService from "../../service/Booking/BookingService";
import CustomSort from "../../functions/CustomSort";
import CustomAlert from "../alerts/CustomAlert";

const BookingsTable = ({ logout, links, tableConfig, setTableConfig, setCustomAlert, setTextCustomAlert, customAlert, textCustomAlert }) => {

    const { buildOrderFieldPath, currentPages } = UsefulFunctions()
    const { getBookings } = BookingService()
    const { dynamicSortMultiple } = CustomSort()

    useEffect(() => {

        setCustomAlert(prevState => {
            return prevState && false
        })

        const fetchBookings = async () => {

            const responseInfo = await getBookings()

            if(responseInfo.error){

                setTextCustomAlert(responseInfo.message)

                setCustomAlert(true)

            }
            else if(responseInfo.list !== []){

                const { sortPath } = buildOrderFieldPath(tableConfig.fieldObjects)

                responseInfo.list.sort(dynamicSortMultiple(...sortPath))

            }

            setTableConfig(prevTableConfig => {
                return {
                    ...prevTableConfig,
                    list: responseInfo.list,
                    dataSize: Math.floor(responseInfo.list.length/10),
                    currentPages: currentPages(responseInfo.list.length)
                }
            })

        }

        fetchBookings()

    }, []);

    return (
        <>
            <Header logout={logout} links={links} tableConfig={tableConfig} setTableConfig={setTableConfig} showSearchButton={true} throwResetFetch={true} getData={getBookings}
                    setCustomAlert={setCustomAlert} setTextCustomAlert={setTextCustomAlert} />

            <Container className={'my-2'}>
                { customAlert && <CustomAlert text={textCustomAlert} /> }
                {!customAlert &&
                        <>
                            <h3>
                                Bookings
                            </h3>

                            <CustomTable tableConfig={tableConfig} setTableConfig={setTableConfig} getData={getBookings}
                            setCustomAlert={setCustomAlert} setTextCustomAlert={setTextCustomAlert} />
                        </>
                }
            </Container>
        </>
    );
};

export default BookingsTable;