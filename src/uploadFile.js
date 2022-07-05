import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import FileUploadOutlinedIcon from '@mui/icons-material/FileUploadOutlined';
import axios from 'axios';



const Input = styled('input')({
    display: 'none',
});


export default function UploadButton() {


    function onFileChange(event) {

        // Update the state
        var selectedFiles = event.target.files

        // Create an object of formData
        const formData = new FormData();

        for (var file of selectedFiles){
        // Update the formData object
        formData.append(
            "file",
            file,
        );
        }
        // console.log('post')

        // Request made to the backend api
        // Send formData object
        axios.post("http://localhost:3001/pythonFunctions", formData);
    };

    return (
        <label htmlFor="upload-button-file">
            <Input accept=".py" id="upload-button-file" multiple type="file" onChange={onFileChange} />
            <Button variant="outlined" component="span" endIcon={<FileUploadOutlinedIcon />}>
                Upload
            </Button>
        </label>
    );
}