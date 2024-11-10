import { useContext } from "react";
import { Stack } from "react-bootstrap";
import { Link } from "react-router-dom";

import editIcon from '../assets/icons/edit.svg'
import deleteIcon from '../assets/icons/delete.svg'

import { NameContext } from "../context/NameContext";

interface IProps {
    nameDetail: IName
}

export default function EditAndDeleteBtns({nameDetail}: IProps) {

    const {setNameDetail, handleDelete} = useContext(NameContext)

  return (
    <Stack className="mt-3" direction="horizontal" gap={3}>
        <Link to={`/name/edit/${nameDetail.name}`} onClick={() => {setNameDetail({...nameDetail})}}> 
            <img src={editIcon} alt="edit icon" />
        </Link>
        <button className="btn btn-link">
            <img src={deleteIcon} alt="delete icon" onClick={() => handleDelete(nameDetail.name)}/>
        </button>
    </Stack>
  )
}