import axios from "axios"
import { API_KEY, SHEET_ID, SHEET_NAME } from '@env';



const getData = async () =>{
    const {data} = await axios.get(`https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/A:C?valueRenderOption=FORMATTED_VALUE&key=${API_KEY}`)
    return data
}

export default getData